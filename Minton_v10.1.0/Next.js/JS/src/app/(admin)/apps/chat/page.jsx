import dynamic from "next/dynamic";
// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
const Chat = dynamic(() => import('./index'));
export const metadata = {
  title: "Chat"
};

// ChatApp
const ChatApp = () => {
  return <>
            <PageBreadcrumb breadCrumbItems={[{
      label: "Apps",
      path: "/apps/chat"
    }, {
      label: "Chat",
      path: "/apps/chat",
      active: true
    }]} title={"Chat"} />

            <Chat />

        </>;
};
export default ChatApp;