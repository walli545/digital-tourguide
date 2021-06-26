FROM jboss/keycloak:13.0.1

COPY keycloak-local-conf.json /tmp/conf.json
# COPY disable-theme-cache.cli /opt/jboss/startup-scripts/disable-theme-cache.cli
COPY /tourguide-theme/ /opt/jboss/keycloak/themes/tourguide-theme

CMD ["-Dkeycloak.migration.action=import", "-Dkeycloak.migration.provider=singleFile", "-Dkeycloak.migration.file=/tmp/conf.json", "-Dkeycloak.migration.strategy=IGNORE_EXISTING"]
