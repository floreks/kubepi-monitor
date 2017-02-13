FROM floreks/kubepi-base

ADD build /

ENTRYPOINT ["/kubepi-monitor-linux-arm-6"]

EXPOSE 80
