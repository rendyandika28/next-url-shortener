import AppToast from "../app/toast";

const AppProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      {children}
      <AppToast />
    </>
  );
}

export default AppProvider;
