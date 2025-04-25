import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useGetChannelsQuery } from '../api.js';
import Channels from '../components/Channels.jsx';
import MessageBox from '../components/MessageBox.jsx';

const MainPage = () => {
  const { isLoading: isChannelsLoading, error: channelsError } = useGetChannelsQuery();

  useEffect(() => {
    if (channelsError) {
      console.error(channelsError);
    }
  }, [channelsError]);

  return (
    <Container className='h-100 my-4 overflow-hidden rounded shadow'>
      <Row className='row h-100 bg-white flex-md-row'>
        <Col className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
          <Channels />
        </Col>
        <MessageBox />
      </Row>
    </Container>
  );
};

export default MainPage;
