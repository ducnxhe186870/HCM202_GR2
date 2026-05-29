import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import { useMutation } from "@tanstack/react-query";
// import ky from "ky";
import type { ChatMessage } from "../components/FloatAIChat";

interface chatData {
  userChat: string;
  chatHistory: ChatMessage[]
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>
}

const aiInstruction = `
Bạn là DoanKetBot. 
Nhiệm vụ của bạn:
1. Chỉ trả lời cho:
   - Các câu chào hỏi xã giao.
   - Các câu hỏi liên quan đến "Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc", bao gồm:
     + Vai trò, ý nghĩa chiến lược của đại đoàn kết.
     + Lực lượng tham gia khối đại đoàn kết.
     + Điều kiện để xây dựng khối đại đoàn kết.
     + Hình thức, nguyên tắc tổ chức của Mặt trận dân tộc thống nhất.
     + Phương thức xây dựng khối đại đoàn kết.
     + Ý nghĩa lịch sử và hiện tại của tư tưởng này.
     + ...có thể mở rộng nhiều nữa, miễn là trong phạm vi "tư tưởng hồ chí minh"...
2. Với mọi câu hỏi khác, bạn phải từ chối và trả lời thân thiện, ví dụ:
   "Xin lỗi, câu hỏi này nằm ngoài phạm vi bài học. Bạn hãy thử hỏi một câu khác liên quan đến chủ đề đoàn kết nhé!"
3. Phong cách trả lời:
   - Luôn trả lời bằng tiếng việt, dù cho câu hỏi có là tiếng anh.
   - Ngắn gọn, rõ ràng, dễ hiểu.
   - Thân thiện, khuyến khích người học hỏi thêm trong phạm vi bài học.
   - Có thể trích dẫn lời Hồ Chí Minh nếu phù hợp (ví dụ: “Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công.”).
`;

// hard-coded :(((
// fpt wifi tệ vcl, không chạy nổi cloudfare functions để mà giấu api key, chán
const googleGemini = new GoogleGenAI({apiKey: "AIzaSyCABLZZ3MtFdDjZX4eNURBB7GNlxSV9WCo"});

export function useAiChatMutation() {
  return useMutation<GenerateContentResponse, Error, chatData>({
    mutationFn: async (chatData) => {
      if (!chatData.userChat) throw new Error("Không chat thì gửi làm gì? >:(");

      chatData.setChatHistory(prev => [...prev,
      { isBot: false, msg: chatData.userChat, sentAt: new Date() }
      ])

      // nếu wifi mạnh hơn thì nên dùng cloudfare function như này
      // return await ky.post("/api/gemini", {
      //   json: chatData
      // }).json<GenerateContentResponse>()

      const chatModel = googleGemini.chats.create({
        model: "gemini-2.5-flash",
        history: chatData.chatHistory?.map(chat => ({
          role: chat.isBot ? "model" : "user",
          parts: [{ text: chat.msg }]
        })),
        config: {
          thinkingConfig: {
            thinkingBudget: 0
          },
          systemInstruction: aiInstruction
        }
      })

      return await chatModel.sendMessage({ message: chatData.userChat })
    },
    onSuccess: (data, chatData) => {
      chatData.setChatHistory(prev => [...prev, {
        isBot: true,
        // msg: data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Lỗi không xác định",
        msg: data.text ?? "Lỗi không xác định",
        sentAt: new Date()
      }])
    },
    onError: (error, chatData) => {
      console.log("Error:" + error.message)
      chatData.setChatHistory(prev => [...prev, {
        isBot: true,
        msg: "Lỗi mạng! (mạng fpt chán lắm)",
        sentAt: new Date()
      }])
    }
  })
}