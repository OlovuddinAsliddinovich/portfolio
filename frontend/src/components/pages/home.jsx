import Layout from "../layouts/layout";
import { useSelector } from "react-redux";
import Information from "../layouts/information";
import MostPopularCourse from "../layouts/most-popular-course";
import ProjectsInformation from "../layouts/projectsi-nformation";
import CodeResourceInformation from "../layouts/code-resource-information";
import { Helmet } from "react-helmet";

const Home = () => {
  const { mode } = useSelector((state) => state.mode);

  return (
    <Layout>
      <Helmet>
        <title>Bosh Sahifa</title>
        <meta
          name="description"
          content="Onlayn o'quv platformasi - turli sohalarda sifatli va interaktiv ta'limni taklif qilamiz. Bizning kurslarimiz sizga bilim olish va professional ko'nikmalarni rivojlantirishda yordam beradi."
        />
        <meta property="og:title" content={"Onlayn o'quv platformasi"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://onlayn-darslar.uz"} />
        <meta property="og:site_name" content="Onlayn o'quv platformasi" />
      </Helmet>
      <div className="w-full">
        {/* About of the site */}
        <Information mode={mode} />

        {/* Most popular courses */}
        <MostPopularCourse mode={mode} />

        {/* Projects */}
        <ProjectsInformation mode={mode} />

        {/* Code Resources */}
        <CodeResourceInformation mode={mode} />
      </div>
    </Layout>
  );
};

export default Home;
