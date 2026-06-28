import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import AboutTimeline from "../components/about/AboutTimeline";
import AboutTeam from "../components/about/AboutTeam";
import AboutStats from "../components/about/AboutStats";
import AboutCta from "../components/about/AboutCta";
import Seo from "../components/ui/Seo";

const About = () => {
  return (
    <>
      <Seo
        title="Biz haqimizda"
        description="2015-yildan beri O'zbekistondagi yetakchi online IT va dizayn ta'lim platformasi. 5000+ bitiruvchi."
      />
      <AboutHero />
      <AboutMission />
      <AboutTimeline />
      <AboutTeam />
      <AboutStats />
      <AboutCta />
    </>
  );
};

export default About;
