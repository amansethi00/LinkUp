import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Heading,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Button,
  Text,
  CardFooter,
  Switch,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';
import { assets } from '../constants';
import { useAppContext } from '../App';
import api from '../api';
import { updateAssetsApi, updateAssetStatusApi } from '../api/requests';

const defaultInputState = {
  title: '',
  url: '',
};
const Admin = () => {
  const { appData, dispatch } = useAppContext();
  const { userData } = appData;
  const { values, handleChange, handleReset } = useFormik({
    initialValues: defaultInputState,
    onSubmit: async (values) => {},
  });

  const isValidUrl = (x: string) => {
    const reg =
      /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    return x.match(reg);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const onCloseModal = () => {
    setModalOpen(false);
  };
  const onAddAsset = async () => {
    setModalOpen(true);
  };
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/config');
      console.log('data', data);
      dispatch({ type: 'UPDATE_ASSETS', payload: data.data });
      console.log(data);
    })();

    return () => {};
  }, []);

  const updateAssets = async (e) => {
    if (isValidUrl(values.url)) {
      const newAsset = {
        url: values.url,
        title: values.title,
      };
      const assets = appData?.userData?.assets
        ? [...appData?.userData?.assets, { ...newAsset, status: true }]
        : [{ ...newAsset, status: true }];
      console.log('ass', assets);
      const response = await updateAssetsApi(assets);
      dispatch({ type: 'UPDATE_ASSETS', payload: response.data });
      handleReset(e);
      console.log('response', response);
    }
    onCloseModal();
  };

  const toggleStatus = async (asset) => {
    let newAsset = { ...asset };
    if (!asset?.status || asset.status === 'false') {
      newAsset = { ...newAsset, status: true };
    } else {
      newAsset = { ...newAsset, status: false };
    }
    const response = await updateAssetStatusApi(newAsset);
    console.log('response', response);
    dispatch({ type: 'UPDATE_ASSETS', payload: response.data });
  };

  console.log('values', values);

  console.log('isVlaid', isValidUrl(values.url));

  console.log(appData);
  return (
    <VStack padding={'4'} width={'full'}>
      <Heading>Admin</Heading>
      <VStack width={'full'} textAlign={'center'}>
        <Button onClick={onAddAsset} type="button" width={'full'} margin="4">
          Add Link
        </Button>
        {userData?.assets?.map((asset, index) => {
          const status = asset.status;
          return (
            <Card key={asset?.id} marginBottom={'4 !important'} variant={'elevated'} width="full">
              <CardBody textAlign={'left'} padding={'2'} paddingBottom={0}>
                <Heading fontSize={'sm'} size="md">
                  {asset.title}
                </Heading>
                <Text fontSize={'sm'}>{asset.url}</Text>
              </CardBody>
              <CardFooter justifyContent={'flex-end'} alignItems={'center'} padding={'1'}>
                <Switch onChange={(e) => toggleStatus(asset)} isChecked={status} id="status" />
                <Button marginLeft={'1'} variant={'ghost'} size="sm">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </VStack>
      <Modal closeOnEsc isOpen={isModalOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent margin={2}>
          <ModalHeader>Enter URL</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input id="url" name="url" onChange={handleChange} variant={'outline'} placeholder="URL" />
          </ModalBody>

          <ModalFooter>
            <Button disabled={isValidUrl(values.url) ? false : true} colorScheme="blue" mr={3} onClick={updateAssets}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Admin;
