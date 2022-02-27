import { BsCheckCircle } from "react-icons/bs";
import { useSpring, animated } from "react-spring";
import { Fade, Zoom, Slide } from "react-reveal";

const AboutScreen = () => {
  const styles1 = useSpring({
    to: { opacity: 1, transform: "translate(0,0)" },
    from: { opacity: 0, transform: "translate(0px,100px)" },
    delay: 200,
  });
  const styles2 = useSpring({
    to: { opacity: 1, transform: "translate(0,0)" },
    from: { opacity: 0, transform: "translate(0px,1000px)" },
    delay: 200,
  });

  return (
    <div className="about__main">
      <div
        style={{
          backgroundColor: "transparent",
          // backgroundImage: "linear-gradient(90deg, #75519f 0%, #d345a2 100%)",
          backgroundImage: "linear-gradient(90deg, #de6161 0%, #375dd3 100%)",
        }}
      >
        <animated.div style={styles1} className="about__first">
          <h1>We are Rojgar!</h1>
          <p>
            We are on a mission to create opportunities in Nepal and help boost
            economy towards better lives.
          </p>
        </animated.div>
      </div>

      <animated.div style={styles2} className="about__second">
        <h1>Our Story</h1>
        <div className="about__second_p">
          <p>
            With the increasing ascendancy of the internet in our lives and the
            present scenario of the pandemic, the freelance marketplace and
            global payment mode have immensely influenced the working culture of
            Nepal. Nepalese people are finding newer ways of job seeking and
            scanning for employment across the globe with the help of several
            online Freelancing Platforms.
          </p>
          <p>
            Nepal, a country of Asia, lying along the southern slopes of
            the Himalayan mountain ranges. Also known for the highest peak in
            the world Mount Everest and the birthplace of Lord Buddha boasts its
            cultural diversity and many rich traditions. It is a landlocked
            country located between India to the east, south, and west and
            the Tibet Autonomous Region of China to the north. Its territory
            extends roughly 500 miles (800 kilometers) from east to west and 90
            to 150 miles from north to south. The people of Nepal mostly relied
            on agriculture and tourism. Though tourism still remains an integral
            part of the Nepalese economy, in recent days Nepal has been very
            popular for outsourcing manpower, especially for other Asian and
            Middle Eastern countries.
          </p>
          <p>
            Nepalese people are known for their honesty and friendly and
            hospitable nature. Nepal’s huge skilled population from the age of
            18-54 is yet to be discovered by the rest of the world. With skills
            ranging from excellent back-office tasks to state-of-the-art IT
            development, IT support and not to mention ancient knowledge such as
            yoga and meditation to name a few.
          </p>
          <p>Hence, we bring Rojgar!</p>
        </div>
      </animated.div>
      <div className="about__third">
        <Fade left>
          <div className="about__third_img">
            <img
              src="https://sakchha.com/wp-content/uploads/elementor/thumbs/fallon-michael-8LKQfBumjMo-unsplash-p7yycd6lh3dzpw8xyzomtyheqa1mw2vmml8jslpbw0.jpeg"
              alt="rojgar"
              // style={{ width: "50%", height: "auto" }}
            />
          </div>
        </Fade>
        <Fade right>
          <div className="about__third_text">
            <h1>About Rojgar</h1>
            <p>
              Rojgar is a Nepali service platform that helps businesses explore,
              build, and operate offshore teams. Its main focus to “remove
              boundaries create a global world defines by successful remote work
              and make Nepal a back office of the world. It aims to provide:
            </p>
            <div className="about__third_text_ul">
              <ul>
                <li>
                  <span style={{ color: "green" }}>
                    <BsCheckCircle />
                  </span>
                  <span>
                    User ease and satisfaction for remote work journey{" "}
                  </span>
                </li>
                <li>
                  <span style={{ color: "green" }}>
                    <BsCheckCircle />
                  </span>
                  <span>Passion for creating jobs</span>
                </li>
                <li>
                  <span style={{ color: "green" }}>
                    <BsCheckCircle />
                  </span>
                  <span>
                    Commitment to make exciting service platform and long-term
                    thinking
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Fade>
      </div>

      <div className="about__fourth">
        <div>
          <p>
            <Zoom left cascade>
              In this time wherein the difficulty of the pandemic is increasing,
              and everyone is facing issues with health, business, travel, job,
              and day-to-day end-meet, we thought this is the perfect way to
              connect Nepal to the rest of the world and provide awareness that
              various skills in Nepal can be hired remotely by organizations and
              individuals outside of Nepal. Nepal is a pool of talented
              individuals who are constantly vying for opportunities and this
              new age of remote working can open many doors of progress for
              them. The trend of remote work no doubt will be a preferred choice
              for a lot of businesses and they will be looking to accomplish
              their tasks at a competitive cost and with a quick turnaround
              time. This is the perfect time to launch such a platform for
              Buyers outside of Nepal to tap into our skills in Nepal.
            </Zoom>
          </p>
          <p>
            <Zoom left cascade>
              Our typical clients have 20-300 employees, based in the high-cost
              English-speaking world, and operate in any sector or vertical.
              Sakchha is an aggregator marketplace for outsourcing. It
              specifically provides the conduit between Nepalese outsourcing
              suppliers (individuals and businesses) and the businesses –
              clients across the globe. It is an outsourcing advisory for Nepal,
              as well as offering a full spectrum of brokerage, implementation,
              and co-management services.{" "}
            </Zoom>
          </p>
        </div>
      </div>
      <div className="about__fifth">
        <div className="about__fifth_slide">
          <div className="about__fifth_one">
            <Slide top>
              <h3>Our Vision</h3>
              <p style={{ color: "white" }}>
                To make Nepal the back office of the world.
              </p>
            </Slide>
          </div>
          <div className="about__fifth_two">
            <Slide bottom>
              <h3>Our Mission</h3>
              <p style={{ color: "white" }}>
                To create opportunities in Nepal and help boost the economy
                towards better lives.
              </p>
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
