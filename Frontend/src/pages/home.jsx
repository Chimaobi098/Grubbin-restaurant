import { Link } from "react-router-dom";
import styles from "../../public/home.module.css";
import FeatureSection from "../../components/featureSection";

const Home = () => {
  return (
    <>
      <section className={styles.landingPage}>
        <div className={styles.landingPageLeftSide}>
          {/* <div> */}
          <h1 className={styles.landingPageHeader}>
            You don't need a{" "}
            <span style={{ color: "var(--primary-red" }}>silver fork</span> to
            eat good food
          </h1>
          <p className={styles.landingPageBody}>
            Over here at Grubbin we deliver the best food related experiences
            money can buy, Dig in
          </p>
          <div className={styles.btnContainer}>
            <Link to="/menu" className="fancy-btn primary-btn">
              View menu
            </Link>
          </div>
        </div>
        <div className={styles.landingPageRightSide}>
          <img
            src="https://res.cloudinary.com/ditqlruxn/image/upload/f_auto/q_auto/spaghetti_vmldpz?_a=BAMAJaFD0"
            alt="landing-page-image"
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      </section>

      <section className={styles.aboutUsPage}>
        <div className={styles.aboutUsLeftSide}>
          <img
            src="https://res.cloudinary.com/ditqlruxn/image/upload/f_auto/q_auto/Group_6_hd49qx?_a=BAMAJaFD0"
            alt="about-us-image"
            style={{ maxWidth: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div className={styles.aboutUsRightSide}>
          <div className={styles.aboutUsRightSideContainer}>
            <p className={styles.aboutUsRedText}> About us</p>
            <h1 className={styles.aboutUsHeader}>
              Finger-lickin’{" "}
              <span
                style={{ display: "flex", alignItems: "center" }}
                className={styles.foodBowlImage}
              >
                F
                <img
                  src="https://res.cloudinary.com/ditqlruxn/image/upload/f_auto/q_auto/F_0_0_D_cigxov?_a=BAMAJaFD0"
                  alt="bowl of food"
                />
                d
              </span>
            </h1>
            <p className={styles.aboutUsBodyText}>
              At Grubbin, we’re devoted to providing an exquisite dining
              experience alongside a wide variety of various delicacies to
              soothe your taste buds
            </p>
            <div className={styles.aboutUsReviews}>
              <div className={styles.aboutUsAvatarGroup}>
                <img
                  src="https://res.cloudinary.com/ditqlruxn/image/upload/f_auto/q_auto/Avatar_group_nffqii?_a=BAMAJaFD0"
                  alt="avatar-group"
                />
              </div>
              <div className={styles.aboutUsReviewSection}>
                <p>Our happy customers</p>
                <div>
                  <p style={{ display: "flex", gap: "0.5rem" }}>
                    <img src="https://res.cloudinary.com/ditqlruxn/image/upload/f_auto/q_auto/star_kjkcnn?_a=BAMAJaFD0" />
                    4.8 (1.3M reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <FeatureSection />
      </section>
      <section className={styles.mobileSection}>
        <img
          src="https://res.cloudinary.com/ditqlruxn/image/upload/f_auto/q_auto/Frame_16_oc4kao?_a=BAMAJaFD0"
          style={{ maxWidth: "100%", height: "auto", display: "block" }}
        />
      </section>
    </>
  );
};

export default Home;
