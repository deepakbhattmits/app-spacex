import type { GetStaticProps, NextPage } from "next";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import styles from "../styles/Home.module.scss";
import { GET_LAUNCHES } from "../queries";
import CustomTable from "../components/CustomTable";
import NavBar from "../components/navbar/Navbar";
interface IProp {
  updatedData: any[];
}
const Home: NextPage<IProp> = ({ updatedData }) => {
  return (
    <div className={styles.container}>
      <NavBar />
      <CustomTable datas={updatedData} />
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { launches },
  } = await client.query({
    query: GET_LAUNCHES,
  });
  const getMission = async (missionId?: string) => {
    const { data } = await client.query({
      query: gql`
                query  {
                  mission(id: "${missionId}") {
                    description
                  }
                }
            `,
    });
    return data?.mission?.description?.toString();
  };
  const updatedData = await Promise.all(
    launches?.map(async (el: any) => {
      const data = await getMission(el?.mission_id[0]);
      return {
        ...el,
        description: !!data ? data : "No description found for this mission",
      };
    })
  );

  return {
    props: {
      updatedData,
    },
  };
};
export default Home;
