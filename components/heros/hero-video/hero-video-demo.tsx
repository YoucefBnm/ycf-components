import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroButton,
  HeroVideo,
} from "./hero-video"

export const HeroVideoDemo = () => {
  return (
    <section>
      <ContainerScroll className="h-[350vh]">
        <ContainerSticky
          style={{
            background:
              "radial-gradient(40% 40% at 50% 20%, #0e19ae 0%, #0b1387 22.92%, #080f67 42.71%, #030526 88.54%)", // background:
          }}
          className="bg-stone-900 px-6 py-10 text-slate-50"
        >
          <ContainerAnimated className="space-y-4 text-center">
            <h1 className="text-5xl font-medium tracking-tighter  md:text-6xl">
              Scroll & Roll
            </h1>
            <p className="mx-auto max-w-[42ch] opacity-80">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
              et, distinctio eum impedit nihil ipsum modi.
            </p>
          </ContainerAnimated>

          <ContainerInset className="max-h-[450px] w-auto py-6">
            <HeroVideo
              src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
              data-src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
            />
          </ContainerInset>
          <ContainerAnimated
            transition={{ delay: 0.4 }}
            outputRange={[-120, 0]}
            inputRange={[0, 0.7]}
            className="mx-auto mt-2 w-fit "
          >
            <HeroButton>Get Started</HeroButton>
          </ContainerAnimated>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  )
}
