#!/bin/sh
# Purga o cache do Cloudflare (por hostname) depois de um deploy do frontend.
#
# O HTML da SPA fica em cache no edge do Cloudflare por muito tempo; sem o
# purge, um deploy novo continua servindo HTML antigo, apontando para
# index-<hash>.js do build anterior (e chunks lazy que já não existem).
#
# Uso no Coolify: campo "Post-deployment command" do recurso do frontend:
#   /usr/local/bin/purge-cf-cache
# O Coolify roda esse comando no container novo, depois de marcar o deploy como
# concluído (o container antigo já foi removido), e só registra falha no log.
#
# Variáveis (definidas no Coolify, em runtime):
#   CF_API_TOKEN     token com permissão Zone > Cache Purge > Purge (só essa zona)
#   CF_ZONE_ID       Zone ID de foconoobjetivo.com
#   CF_PURGE_HOSTS   hostnames separados por vírgula
#                    (padrão: carreira-tech.foconoobjetivo.com)
#   CF_PURGE_DELAY   segundos de espera antes do purge (padrão: 5)
#   CF_API_BASE      só pra teste (padrão: https://api.cloudflare.com/client/v4)
#   CF_PURGE_DRY_RUN=1  só mostra o corpo da requisição
#
# Sem CF_API_TOKEN/CF_ZONE_ID não faz nada e sai com sucesso — o Docker local
# não depende de credenciais. Roda no busybox do nginx:alpine (sem curl/jq).
set -u

TOKEN="${CF_API_TOKEN:-}"
ZONE="${CF_ZONE_ID:-}"
HOSTS="${CF_PURGE_HOSTS:-carreira-tech.foconoobjetivo.com}"
DELAY="${CF_PURGE_DELAY:-5}"
API_BASE="${CF_API_BASE:-https://api.cloudflare.com/client/v4}"

if [ -z "$TOKEN" ] || [ -z "$ZONE" ]; then
  echo "[purge-cf-cache] CF_API_TOKEN/CF_ZONE_ID não definidos — nada a fazer."
  exit 0
fi

# "a.com, b.com" -> "a.com","b.com"
json_hosts=""
old_ifs=$IFS
IFS=','
for h in $HOSTS; do
  h=$(echo "$h" | tr -d ' ')
  [ -n "$h" ] && json_hosts="${json_hosts:+$json_hosts,}\"$h\""
done
IFS=$old_ifs

if [ -z "$json_hosts" ]; then
  echo "[purge-cf-cache] CF_PURGE_HOSTS vazio — nada a purgar." >&2
  exit 1
fi
BODY="{\"hosts\":[${json_hosts}]}"

if [ "${CF_PURGE_DRY_RUN:-0}" = "1" ]; then
  echo "[purge-cf-cache] dry-run: POST /zones/<zone>/purge_cache $BODY"
  exit 0
fi

sleep "$DELAY"

attempt=1
while [ "$attempt" -le 3 ]; do
  # O token vai só no header (nunca é impresso). O wget do busybox devolve
  # não-zero em qualquer status HTTP de erro.
  if RESP=$(wget -q -O- -T 20 \
        --header="Authorization: Bearer $TOKEN" \
        --header="Content-Type: application/json" \
        --post-data="$BODY" \
        "$API_BASE/zones/$ZONE/purge_cache" 2>&1) &&
     echo "$RESP" | grep -Eq '"success"[[:space:]]*:[[:space:]]*true'; then
    echo "[purge-cf-cache] ok: purge de $HOSTS enviado (tentativa $attempt)."
    exit 0
  fi
  echo "[purge-cf-cache] tentativa $attempt/3 falhou: $RESP" >&2
  attempt=$((attempt + 1))
  [ "$attempt" -le 3 ] && sleep 5
done

echo "[purge-cf-cache] FALHOU — purgue manualmente no painel do Cloudflare (Caching > Purge Cache)." >&2
exit 1
