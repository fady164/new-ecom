import { useAppSelector } from "../../store/hooks";

function withGuardTest<T extends (...args: any[]) => React.ReactNode>(
  originalFunction: T
): T {
  return ((...args: Parameters<T>): React.ReactNode => {
    const { success } = useAppSelector((state) => state.auth);

    return success ? originalFunction(...args) : "<div>not authorized</div>";
  }) as T;
}

export default withGuardTest;
