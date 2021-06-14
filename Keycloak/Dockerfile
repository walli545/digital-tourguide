FROM jboss/keycloak:13.0.1

COPY keycloak-local-conf.json /tmp/conf.json
# COPY disable-theme-cache.cli /opt/jboss/startup-scripts/disable-theme-cache.cli
COPY /tourguide-theme/ /opt/jboss/keycloak/themes/tourguide-theme

ENV KEYCLOAK_IMPORT=/tmp/conf.json
ENV KEYCLOAK_LOGLEVEL=WARN
ENV ROOT_LOGLEVEL=WARN