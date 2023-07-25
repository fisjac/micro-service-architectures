import buildClient from "../api/build-client";


const LandingPage = ({currentUser}) => {
  // console.log('currentUser:',currentUser)
  return <h1>Landing Page</h1>
};

LandingPage.getInitialProps = async (context) => {
  console.log('get initial props...')
  const client = buildClient(context)
  const {data} = await client.get('/api/users/currentuser')
  console.log(data)
  return data;
};

export default LandingPage
