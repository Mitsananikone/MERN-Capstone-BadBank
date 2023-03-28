// ./public/home.js
import { Card } from '../components/card';
import Link from 'next/link';

export default function Home(){
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src="https://www.usnews.com/object/image/00000186-dcff-d41b-afb7-fcffca750000/81851c68e3da4506819954f5b6e834e3Silicon_Valley_Bank_97644.jpg?update-time=1678743284000&size=responsive970" className="img-fluid" alt="Responsive image"/>)}
      footer={<Link href="/CreateAccount/">Create an account</Link>}
    />    
  );  
}


// export async function getServerSideProps() {
//   try {
//     const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/user`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (res.status !== 200) {
//       throw new Error(`Error: ${await res.text()}`);
//     }

//     const data = await res.json();
//     const alluser = Array.isArray(data.data) ? data.data : [];

//     return { props: { alluser } };
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return { props: { alluser: [] } };
//   }
// }