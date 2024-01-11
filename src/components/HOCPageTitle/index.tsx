import { Helmet } from "react-helmet";

export default function HOCPageTitle(props: any) {
  return (
    <>
      <Helmet>
        <title>{props?.title}</title>
      </Helmet>
      {props?.children}
    </>
  );
}
