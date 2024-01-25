import LottieAnimation from "../Lottie/LottieAnimation";

type LoadingProps = {
  loading: boolean;
  error: string;
  children: JSX.Element;
};

const Loading = ({ error, loading, children }: LoadingProps) => {
  return (
    <>
      {loading ? (
        <LottieAnimation type="loading" />
      ) : error ? (
        <LottieAnimation type="error" />
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
