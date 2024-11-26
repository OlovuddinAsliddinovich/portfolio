import Layout from "../layouts/layout";
import { useSelector } from "react-redux";
import Information from "../layouts/information";
import MostPopularCourse from "../layouts/most-popular-course";
import ProjectsInformation from "../layouts/projectsi-nformation";
import CodeResourceInformation from "../layouts/code-resource-information";

const Home = () => {
  const { mode } = useSelector((state) => state.mode);

  return (
    <Layout>
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
