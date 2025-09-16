export default function TabelLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-[2px] dark:border-transparent   border-[#EBEBEB] p-[16px]">{children}</div>
  );
}
