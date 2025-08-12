import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src=""
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Our dynamic e-commerce platform revolutionizes product discovery by enabling users to find items based on descriptive inputs. Powered by advanced algorithms and natural language processing, our platform delivers tailored product recommendations, enhancing user experience. With intuitive interfaces and robust security measures, we prioritize seamless navigation and data protection. Join us in reshaping the e-commerce landscape with personalized search solutions that cater to individual needs and preferences.          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
