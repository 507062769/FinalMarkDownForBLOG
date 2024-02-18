import { ChatContent } from "@/stores/AiChat";

export async function fetchSendMessage(message: ChatContent[]) {
  const defaultConfig = {
    method: "POST",
    body: {
      message,
    } as any,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=",
      defaultConfig
    );
    if (!response.ok) {
      throw new Error("请求失败");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
