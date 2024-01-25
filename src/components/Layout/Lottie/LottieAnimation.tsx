import Lottie from "lottie-react";
import { emptyCartLottie, errorLottie, loadingLottie } from "../../../assets";
interface Props {
  type: "loading" | "error" | "emptyCart";
}

const LottieAnimation = ({ type }: Props) => {
  const lottiesJson = {
    loading: loadingLottie,
    error: errorLottie,
    emptyCart: emptyCartLottie,
  };

  const lottieJson = lottiesJson[type];

  return (
    <div className="flex justify-center">
      <Lottie className="w-1/4" animationData={lottieJson} loop={true} />
    </div>
  );
};

export default LottieAnimation;
