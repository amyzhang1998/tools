#!/bin/bash
timestamp=`date "+%Y%m%d%H%M%S"`
tag="littledian/tools:$timestamp"

docker build -t "$tag" .

have=$(docker inspect --format='{{.Name}}' $(docker ps -aq) |grep tools  | cut -d"/" -f2)
if [[ $have == "tools" ]]; then
  docker container stop tools
  docker container rm tools
fi

tags=$(docker images | grep littledian/tool | awk '{print $2}')
for item in $tags
do
  if [[ $tag != $item ]]; then
        docker rmi littledian/tools:$item
  fi
done

docker run -d -p 3000:3000 --name tools --restart always $tag
