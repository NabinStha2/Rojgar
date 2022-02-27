import React from "react";
import { Row, Col, Button, Image, Stack } from "react-bootstrap";
import Video from "../assets/videos/web.mp4";
import p1 from "../assets/images/post-a-project (1).png";
import p2 from "../assets/images/work.png";
import p3 from "../assets/images/pay-safely.png";
import p4 from "../assets/images/about-me.png";
import third from "../assets/images/third.jpg";
import i1 from "../assets/images/img1.jpg";
import i2 from "../assets/images/img2.jpg";
import i3 from "../assets/images/img3.jpg";
import i4 from "../assets/images/img4.jpg";

const HomeScreen = () => {
  return (
    <div>
      <Row className="first-part">
        <Col sm={12} md={6} xs={12}>
          <div className="top">
            <h2>
              Find the perfect <i>freelance</i> services for your business
            </h2>
            <p>
              Millions of people use Rojgar.com to turn their ideas into
              reality. If you are an individual from Nepal or anywhere in the
              world looking for an opportunity, join our network. Get to work
              with top companies from all around the world.
            </p>
          </div>
          <div className="top-btn">
            <Button>Hire a Talent </Button>
            <Button href="/projects/all">Find a Job</Button>
          </div>
        </Col>
        <Col md={6} className="video-container">
          <video src={Video} autoPlay muted loop />
        </Col>
      </Row>
      <div className="sec-part">
        <h2>Need Something done?</h2>
        <Row>
          <Col id="c1" xs={12} md={6} lg={3}>
            <Row>
              <div>
                <Image src={p1} />
                <h4>Post a job</h4>
              </div>
            </Row>
            <Row>
              <p>
                It’s free and easy to post a job. Simply fill in a title,
                description and budget and competitive bids come within minutes.
              </p>
            </Row>
          </Col>
          <Col id="c1" xs={12} md={6} lg={3}>
            <Row>
              <div>
                <Image src={p2} />

                <h4>Choose freelancers</h4>
              </div>
            </Row>
            <Row>
              <p>
                No job is too big or too small. We've got freelancers for jobs
                of any size or budget, across 1800+ skills. No job is too
                complex. We can get it done!
              </p>
            </Row>
          </Col>
          <Col id="c1" xs={12} md={6} lg={3}>
            <Row>
              <div>
                <Image src={p3} />
                <h4>Pay safely</h4>
              </div>
            </Row>
            <Row>
              <p>
                Only pay for work when it has been completed and you're 100%
                satisfied with the quality using our milestone payment system.
              </p>
            </Row>
          </Col>
          <Col id="c1" xs={12} md={6} lg={3}>
            <Row>
              <div>
                <Image src={p4} />

                <h4>We're here to help</h4>
              </div>
            </Row>
            <Row>
              <p>
                Our talented team of recruiters can help you find the best
                freelancer for the job and our technical co-pilots can even
                manage the project for you.
              </p>
            </Row>
          </Col>
        </Row>
      </div>
      <Row className="third-part">
        <Col md={6}>
          <Stack gap={2}>
            <h3> Freedom to work on the projects of your choice!</h3>
            <p>
              With Rojgar, you get the freedom of choice and flexibility. You
              will have the full control regarding when, where, and how you
              work. Each project includes an online workspace shared by you and
              your client. You can telecommute from the comfort of your ideal
              location.
            </p>
            <Button> Join us</Button>
          </Stack>
        </Col>
        <Col md={6}>
          <Image src={third} />
        </Col>
      </Row>
      <div className="d-none d-lg-block fourth-part">
        <h2>Skill available with us.</h2>
        <Row>
          <Col>
            <ul>
              <li>Website Design</li>
              <li>Logo Design</li>
              <li>Photoshop</li>
              <li>Mobile Development</li>
              <li>Web Scrapping</li>
              <li>Content Writing</li>
              <li>3D Modelling</li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li>Excel</li>
              <li>MS Word</li>
              <li>Research Writing</li>
              <li>Software Development</li>
              <li>Data Processing</li>
              <li>Article Writing</li>
              <li>Blogging</li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li>C++ programming</li>
              <li>C#</li>
              <li>Java</li>
              <li>Python</li>
              <li>C programming</li>
              <li>React</li>
              <li>Flutter</li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li>Video Editing</li>
              <li>Project Management</li>
              <li>Digital Marketing</li>
              <li>Data Entry</li>
              <li>Virtual Assistant</li>
              <li>Budget Planning</li>
              <li> Technical sales</li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li>Tutoring</li>
              <li>Content Creator</li>
              <li>Telemarketing</li>
              <li>WordPress</li>
              <li>Proofreading</li>
              <li>Event Planning</li>
              <li>UI/UX Designer</li>
            </ul>
          </Col>
        </Row>
      </div>
      <div className="fifth-part">
        <h2>
          We are on a mission to create opportunities in Nepal and help boost
          economy towards better lives.
        </h2>
        <p>
          Save yourself from trial and error of finding the best talent. We will
          present you with profiles of the best talents who match your
          requirement We have handpicked a number of endless service providers
          and freelancers with more than a decade of experience in various
          fields.
        </p>
      </div>
      <Row className="last-part">
        <Col sm={12} md={4}>
          <h3>Freedom to work, on any ideal projects you want.</h3>
          <p>
            With Rojgar, you have the freedom and flexibility to control when,
            where, and how you work. Each project includes an online workspace
            shared by you and your client.
          </p>
        </Col>
        <Col sm={12} md={4}>
          <Row>
            <Image src={i1} />

            <Image src={i4} />
          </Row>
        </Col>
        <Col>
          <Row>
            <Image src={i3} />
            <Image src={i2} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default HomeScreen;
