FROM alpine:3.19

# Install dependencies
RUN apk add --no-cache \
    ca-certificates \
    wget \
    unzip

# Download PocketBase
ARG PB_VERSION=0.22.22
RUN wget -q "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip" \
    -O /tmp/pb.zip \
    && unzip -q /tmp/pb.zip -d /pb \
    && rm /tmp/pb.zip

# Copy migrations and hooks
COPY pb_migrations/ /pb/pb_migrations/
COPY pb_hooks/      /pb/pb_hooks/

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost:8080/api/health || exit 1

CMD ["/pb/pocketbase", "serve", \
     "--http=0.0.0.0:8080", \
     "--dir=/pb/pb_data", \
     "--migrationsDir=/pb/pb_migrations", \
     "--hooksDir=/pb/pb_hooks"]
