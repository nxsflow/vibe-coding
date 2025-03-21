import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Message from "@/components/layout/Message";
import { SupportedLocales } from "@/middleware";

const NotFoundPage = () => {
  // Default to English for the not-found page
  const lang: SupportedLocales = "en-US";

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <Header {...{ lang }} />

      <div className="w-full xl:w-[64rem] px-2 md:px-8 lg:px-16 mb-4 md:mb-8 flex flex-col flex-1">
        <main className="flex-1 justify-center">
          <Message
            title={<>Oops, You&apos;ve Entered the Void!</>}
            description={
              <>
                Well, this is awkward. The page you&apos;re looking for has
                either gone on vacation, entered a witness protection program,
                or never existed in the first place. We checked under the couch,
                behind the fridge, and even in the deep, dark corners of the
                internet—but no luck. Think we just have to accept that this
                page is living its best life… elsewhere.
              </>
            }
            href="/"
            label={<>Back to Safety 🏡</>}
          />
        </main>

        <Footer {...{ lang }} />
      </div>
    </div>
  );
};

export default NotFoundPage;
