#!/bin/bash
timestamp=`date "+%Y%m%d%H%M%S"`
tag="littledian/tools-$timestamp"

docker build -t "$tag" .

docker container stop tools
docker container rm tools

tags=$(docker images | grep littledian/tool | awk '{print $2}')
for item in tags
do
  if ("$tag"!=$item) then
        docker rmi $item
  fi
done

docker run -d -p 3000:3000 --name tools --restart always $tag