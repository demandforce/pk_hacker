FROM centos:centos7

RUN curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
RUN yum -y install nodejs


WORKDIR /app

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /app/
RUN npm install --production

# expose after npm and before src to keep layer rebuilds minimal
EXPOSE 8000
VOLUME ["/app/log"]

ADD ./src /app/src

CMD npm start
