import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUserPublicDataApi } from '../api/requests';
import { Heading, VStack, Card } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';

const UserPublic = () => {
  const { username } = useParams();
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getUserPublicDataApi(username);
      console.log(response);
      setAssets(response.assets);
    })();
  }, []);

  return (
    <VStack>
      <Heading>@{username}</Heading>
      <img alt="avatar" src={faker.image.avatar()}></img>
      {assets?.length > 0 &&
        assets?.map((asset) => {
          return (
            <Card key={asset?.id} variant={'filled'}>
              {asset?.url}
            </Card>
          );
        })}
    </VStack>
  );
};

export default UserPublic;
