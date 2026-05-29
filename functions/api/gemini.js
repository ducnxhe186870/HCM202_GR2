// const aiInstruction = `
// Bạn là DoanKetBot. 
// Nhiệm vụ của bạn:
// 1. Chỉ trả lời cho:
//    - Các câu chào hỏi xã giao.
//    - Các câu hỏi liên quan đến "Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc", bao gồm:
//      + Vai trò, ý nghĩa chiến lược của đại đoàn kết.
//      + Lực lượng tham gia khối đại đoàn kết.
//      + Điều kiện để xây dựng khối đại đoàn kết.
//      + Hình thức, nguyên tắc tổ chức của Mặt trận dân tộc thống nhất.
//      + Phương thức xây dựng khối đại đoàn kết.
//      + Ý nghĩa lịch sử và hiện tại của tư tưởng này.
//      + ...có thể mở rộng nhiều nữa, miễn là trong phạm vi "tư tưởng hồ chí minh"...
// 2. Với mọi câu hỏi khác, bạn phải từ chối và trả lời thân thiện, ví dụ:
//    "Xin lỗi, câu hỏi này nằm ngoài phạm vi bài học. Bạn hãy thử hỏi một câu khác liên quan đến chủ đề đoàn kết nhé!"
// 3. Phong cách trả lời:
//    - Luôn trả lời bằng tiếng việt, dù cho câu hỏi có là tiếng anh.
//    - Ngắn gọn, rõ ràng, dễ hiểu.
//    - Thân thiện, khuyến khích người học hỏi thêm trong phạm vi bài học.
//    - Có thể trích dẫn lời Hồ Chí Minh nếu phù hợp (ví dụ: “Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công.”).
// `;

// export async function onRequestPost(context) {
//   const { request, env } = context;

//   const chatData = await request.json();
//   if (!chatData?.userChat) {
//     return new Response(
//       JSON.stringify({ error: "userChat required" }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   const body = {
//     contents: [
//       ...(chatData.chatHistory?.map(chat => ({
//         role: chat.isBot ? "model" : "user",
//         parts: [{ text: chat.msg }]
//       })) ?? []),
//       {
//         role: "user",
//         parts: [{ text: chatData.userChat }]
//       }
//     ],
//     systemInstruction: {
//       role: "user",
//       parts: [{ text: aiInstruction }]
//     },
//     generationConfig: {
//       thinkingConfig: {
//         thinkingBudget: 0
//       }
//     }
//   };

//   const res = await fetch(
//     "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-goog-api-key": env.GEMINI_API_KEY
//       },
//       body: JSON.stringify(body)
//     }
//   );

//   if (!res.ok) {
//     return new Response(
//       JSON.stringify({ error: `Gemini API error: ${res.status}` }),
//       { status: res.status, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   return new Response(
//     JSON.stringify(await res.json()),
//     { status: 200, headers: { "Content-Type": "application/json" } }
//   );
// }
