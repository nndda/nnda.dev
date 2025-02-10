#!/bin/bash

project="nnda"

if [ -f "./.env" ]; then
  source "./.env"
fi

deployments_count=$(
  curl -s -H "X-Auth-Email: $CLOUDFLARE_EMAIL" -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$project/deployments" \
  | jq -r ".result_info.total_count" \
  | bc
)

deployments_total=$deployments_count
deployments_deleted=0

echo "Deleting $deployments_count deployments..."

purge_deployments() {
  for id in $(
    curl -s -H "X-Auth-Email: $CLOUDFLARE_EMAIL" -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
      "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$project/deployments" \
      | jq -r ".result[].id"
  ); do
    response=$(curl -s -X DELETE -H "X-Auth-Email: $CLOUDFLARE_EMAIL" -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
      "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$project/deployments/$id?force=true")

    if [ $(echo "$response" | jq -r ".success") != "true" ]; then
      if [ $(echo "$response" | jq -r ".errors[0].code") != "8000034" ]; then
        messages=$(echo "$response" | jq -r ".errors")
        echo "Failed to delete deployment $deployments_deleted/$deployments_total: $messages"
      fi
    else
      deployments_count=$(($deployments_count - 1))
      deployments_deleted=$((deployments_deleted + 1))
      echo "Deleted deployment $deployments_deleted/$deployments_total"
    fi
  done

  if [ "$deployments_count" -gt 1 ]; then
    echo "$deployments_count deployments left, continue purging..."
    purge_deployments
  else
    echo "$deployments_deleted deployments deleted"
  fi
}

purge_deployments