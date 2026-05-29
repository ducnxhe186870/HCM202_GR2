import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { db } from "../../services/firebaseService";
import { ref, push, set, get } from "firebase/database";
import { useAuthStore } from "../../stores/authStore";


interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizDataMap {
  [key: string]: Question[];
}

const defaultQuizData: Question[] = [
  {
    id: 1,
    question:
      "Theo Hồ Chí Minh, đại đoàn kết toàn dân tộc có vai trò như thế nào?",
    options: [
      "Là thủ đoạn chính trị tạm thời",
      "Là sách lược đối phó ngắn hạn",
      "Là chiến lược lâu dài, nhất quán",
      "Là biện pháp tình thế khi cách mạng khó khăn",
    ],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: 'Hồ Chí Minh khẳng định: "Đoàn kết là …"',
    options: [
      "Niềm tin của dân tộc",
      "Sức mạnh, then chốt của thành công",
      "Truyền thống lâu đời",
      "Con đường duy nhất để chống ngoại xâm",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question:
      "Nguyên nhân chủ yếu khiến các phong trào Cần Vương, Đông Du, Đông Kinh Nghĩa Thục… cuối thế kỷ XIX thất bại là:",
    options: [
      "Thiếu lãnh đạo kiên định",
      "Thiếu sự chuẩn bị về vũ khí",
      "Chưa tập hợp được sức mạnh toàn dân",
      "Bị thực dân đàn áp khốc liệt",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Trong khối đại đoàn kết toàn dân tộc, lực lượng nòng cốt là:",
    options: [
      "Công – nông – trí thức",
      "Tư sản dân tộc – tiểu thương",
      "Quân đội – thanh niên",
      "Nông dân – binh lính",
    ],
    correctAnswer: 0,
  },
  {
    id: 5,
    question:
      "Theo Hồ Chí Minh, Đảng Cộng sản Việt Nam muốn lãnh đạo khối đại đoàn kết toàn dân tộc thì cần:",
    options: [
      "Chỉ chú trọng lợi ích giai cấp công nhân",
      "Kết hợp hài hòa lợi ích giai cấp và dân tộc",
      "Ưu tiên lợi ích quốc tế hơn trong nước",
      "Đặt lợi ích trí thức lên hàng đầu",
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Đại đoàn kết toàn dân tộc phải gắn liền với:",
    options: [
      "Đoàn kết trong Đảng",
      "Đoàn kết quốc tế",
      "Đoàn kết gia đình – làng xã",
      "Đoàn kết với giai cấp công nhân",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question:
      "Nguyên tắc bất di bất dịch để xây dựng khối đại đoàn kết toàn dân tộc là:",
    options: [
      "Lấy lợi ích chung làm điểm quy tụ",
      "Lấy chủ nghĩa xã hội làm mục tiêu",
      "Lấy phát triển kinh tế làm trọng tâm",
      "Lấy giáo dục làm nền tảng",
    ],
    correctAnswer: 0,
  },
  {
    id: 8,
    question:
      "Truyền thống nào được Hồ Chí Minh coi là cội nguồn sức mạnh để đoàn kết dân tộc?",
    options: [
      "Hiếu học – chăm chỉ – sáng tạo",
      "Yêu nước – nhân nghĩa – đoàn kết",
      "Lạc quan – cần cù – dũng cảm",
      "Nhân ái – kiên cường – sáng suốt",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question:
      'Hồ Chí Minh ví dụ " Năm ngón tay có ngón dài ngón ngắn, nhưng cả năm ngón đều thuộc về một bàn tay. Trong mấy triệu người cũng có người thế này thế khác, nhưng thế này hay thế khác đều dòng dõi tổ tiên ta. Vậy nên phải khoan hồng, đại độ... Có như thế mới thành đoàn kết, có đại đoàn kết thì tương lai chắc chắn sẽ vẻ vang " để nhấn mạnh điều gì?',
    options: [
      "Cần phân biệt giai cấp rõ ràng",
      "Cần phải khoan dung, độ lượng để đoàn kết",
      "Cần tập hợp trí thức trước tiên",
      "Cần chú ý đến thế hệ trẻ",
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question:
      "Nguyên tắc tối cao trong tư tưởng Hồ Chí Minh về xây dựng khối đại đoàn kết toàn dân tộc là:",
    options: [
      "Tin vào sự lãnh đạo của quốc tế cộng sản",
      "Tin vào sự lãnh đạo của trí thức",
      "Yêu dân, tin dân, dựa vào dân, vì dân",
      "Xây dựng lực lượng vũ trang mạnh mẽ",
    ],
    correctAnswer: 2,
  },
  {
    id: 11,
    question:
      "Trong tư tưởng Hồ Chí Minh, chủ thể của khối đại đoàn kết toàn dân tộc là:",
    options: [
      "Công nhân, nông dân",
      "Toàn dân Việt Nam không phân biệt dân tộc, tôn giáo, giai cấp",
      "Trí thức và thanh niên",
      "Quân đội nhân dân",
    ],
    correctAnswer: 1,
  },
  {
    id: 12,
    question:
      "Theo Hồ Chí Minh, để lãnh đạo khối đại đoàn kết, Đảng Cộng sản Việt Nam cần đứng vững trên lập trường nào?",
    options: [
      "Giai cấp tư sản dân tộc",
      "Giai cấp công nhân",
      "Giai cấp nông dân",
      "Trí thức ưu tú",
    ],
    correctAnswer: 1,
  },
  {
    id: 13,
    question:
      "Trong kháng chiến chống Mỹ, sức mạnh của đại đoàn kết dân tộc còn được củng cố nhờ:",
    options: [
      "Sự hỗ trợ từ phong trào phản chiến và nhân dân tiến bộ thế giới",
      "Sự viện trợ vũ khí từ châu Âu",
      "Sự đồng thuận tuyệt đối trong nội bộ Đảng",
      "Chính sách cải cách ruộng đất",
    ],
    correctAnswer: 0,
  },
  {
    id: 14,
    question: "Theo Hồ Chí Minh, muốn thực hiện đại đoàn kết phải:",
    options: [
      "Đặt lợi ích giai cấp lên hàng đầu",
      "Đặt lợi ích dân tộc và nhân dân lao động làm mục tiêu phấn đấu",
      "Chỉ tập trung vào phát triển kinh tế",
      "Dựa vào viện trợ quốc tế",
    ],
    correctAnswer: 1,
  },
  {
    id: 15,
    question:
      'Nguyên lý mácxít nào được Hồ Chí Minh quán triệt khi khẳng định "Cách mạng là sự nghiệp của quần chúng"?',
    options: [
      "Chủ nghĩa tập thể tuyệt đối",
      "Chủ nghĩa duy vật biện chứng",
      "Chủ nghĩa duy vật lịch sử",
      "Nguyên lý quần chúng là động lực của lịch sử",
    ],
    correctAnswer: 3,
  },
];

const matTranDanTocQuizData: Question[] = [
  {
    id: 1,
    question:
      "Hình thức tổ chức cơ bản của khối đại đoàn kết dân tộc theo Hồ Chí Minh là gì?",
    options: [
      "Công đoàn Việt Nam",
      "Mặt trận dân tộc thống nhất",
      "Hội Nông dân Việt Nam",
      "Chính quyền cách mạng",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question:
      "Nguyên tắc quan trọng nhất trong hoạt động của Mặt trận dân tộc thống nhất là:",
    options: [
      "Hiệp thương dân chủ",
      "Tập trung quan liêu",
      "Đa số tuyệt đối",
      "Độc đoán lãnh đạo",
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question:
      "Nội dung nào KHÔNG thuộc nguyên tắc hoạt động của Mặt trận dân tộc thống nhất?",
    options: [
      "Đoàn kết lâu dài, chân thành",
      "Lợi ích dân tộc là điểm quy tụ",
      "Chỉ tập hợp công – nông",
      "Giúp nhau tiến bộ",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question:
      "Theo Hồ Chí Minh, nền tảng để hình thành Mặt trận dân tộc thống nhất là gì?",
    options: [
      "Lợi ích giai cấp công nhân",
      "Lợi ích tối cao của dân tộc",
      "Quyền lợi địa chủ",
      "Tín ngưỡng tôn giáo",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question:
      "Một phương thức quan trọng để xây dựng khối đại đoàn kết dân tộc là:",
    options: [
      "Đặt lợi ích cá nhân lên trên hết",
      "Thống nhất ý chí và hành động trên cơ sở lợi ích dân tộc",
      "Loại trừ các tôn giáo",
      "Chỉ dựa vào tầng lớp công nhân",
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question:
      "Để xây dựng đại đoàn kết dân tộc, Hồ Chí Minh đặc biệt coi trọng yếu tố nào?",
    options: [
      "Sự cạnh tranh kinh tế",
      "Lòng tin và tinh thần yêu nước",
      "Chủ nghĩa cá nhân",
      "Xung đột giai cấp",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question:
      "Tinh thần đoàn kết của Hồ Chí Minh được thể hiện qua khẩu hiệu nào?",
    options: [
      '"Vô sản tất cả các nước liên hiệp lại"',
      '"Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công"',
      '"Không có gì quý hơn độc lập tự do"',
      '"Tất cả vì chủ nghĩa xã hội"',
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Trong khối đại đoàn kết dân tộc, Hồ Chí Minh nhấn mạnh phải:",
    options: [
      "Tôn trọng sự khác biệt và kết hợp hài hòa lợi ích",
      "Ép buộc sự đồng nhất tuyệt đối",
      "Loại bỏ trí thức",
      "Không coi trọng dân tộc thiểu số",
    ],
    correctAnswer: 0,
  },
  {
    id: 9,
    question: "Một phương thức xây dựng khối đại đoàn kết dân tộc là:",
    options: [
      "Phân hóa dân tộc, tôn giáo",
      "Củng cố mối quan hệ giữa Đảng, Nhà nước và Nhân dân",
      "Giới hạn thành phần tham gia",
      "Chỉ dựa vào sức mạnh quốc tế",
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question:
      "Ý nghĩa lớn nhất của việc xây dựng khối đại đoàn kết dân tộc theo Hồ Chí Minh là:",
    options: [
      "Tạo sức mạnh tổng hợp để giành và giữ độc lập dân tộc",
      "Chỉ để phát triển kinh tế",
      "Giải quyết mâu thuẫn giai cấp",
      "Hạn chế vai trò của các tổ chức xã hội",
    ],
    correctAnswer: 0,
  },
  {
    id: 11,
    question:
      "Trong các giai đoạn cách mạng, Mặt trận dân tộc thống nhất có thể thay đổi tên gọi, nhưng bản chất là gì?",
    options: [
      "Tổ chức chính trị đối lập với Đảng",
      "Tổ chức tập hợp mọi lực lượng yêu nước dưới sự lãnh đạo của Đảng",
      "Tổ chức quân sự thuần túy",
      "Cơ quan quản lý nhà nước",
    ],
    correctAnswer: 1,
  },
  {
    id: 12,
    question:
      "Theo Hồ Chí Minh, đoàn kết trong Mặt trận dân tộc thống nhất phải dựa trên phương châm nào?",
    options: [
      '"Cầu đồng tồn dị"',
      '"Chia để trị"',
      '"Dĩ công vi thượng"',
      '"Mạnh được yếu thua"',
    ],
    correctAnswer: 0,
  },
  {
    id: 13,
    question:
      "Hồ Chí Minh yêu cầu việc phê bình trong khối đoàn kết phải được thực hiện như thế nào?",
    options: [
      "Thẳng thắn, kiên quyết, không cần giữ tình cảm",
      "Trên lập trường thân ái, vì nước, vì dân",
      "Công khai trước toàn dân",
      "Bí mật, nội bộ Đảng",
    ],
    correctAnswer: 1,
  },
  {
    id: 14,
    question:
      "Phương thức cơ bản nhất để xây dựng khối đại đoàn kết dân tộc, theo Hồ Chí Minh, là gì?",
    options: [
      "Dân vận khéo",
      "Phát triển kinh tế thị trường",
      "Đào tạo cán bộ quản lý",
      "Hợp tác quốc tế",
    ],
    correctAnswer: 0,
  },
  {
    id: 15,
    question:
      "Mục đích cuối cùng của việc thành lập các đoàn thể quần chúng (Công đoàn, Hội Nông dân, Đoàn Thanh niên, Hội Phụ nữ…) là gì?",
    options: [
      "Tạo cơ hội cho mỗi tầng lớp có tổ chức riêng biệt",
      "Gắn kết quần chúng vào khối đại đoàn kết chung trong Mặt trận",
      "Đảm bảo lợi ích riêng của từng tầng lớp",
      "Tách biệt quần chúng với hoạt động của Đảng",
    ],
    correctAnswer: 1,
  },
];

const doanKetQuocTeQuizData: Question[] = [
  {
    id: 1,
    question:
      "Trong tư tưởng Hồ Chí Minh, đoàn kết quốc tế trước hết xuất phát từ lợi ích nào?",
    options: [
      "Lợi ích dân tộc riêng lẻ",
      "Lợi ích của giai cấp công nhân quốc tế",
      "Lợi ích dân tộc gắn liền với lợi ích nhân loại tiến bộ",
      "Lợi ích kinh tế trước mắt",
    ],
    correctAnswer: 2,
  },
  {
    id: 2,
    question:
      'Hồ Chí Minh từng khẳng định: "Cách mạng Việt Nam là một bộ phận khăng khít của…?"',
    options: [
      "Cách mạng dân chủ tư sản",
      "Cách mạng giải phóng dân tộc ở châu Á",
      "Phong trào cộng sản và công nhân quốc tế",
      "Cách mạng văn hóa thế giới",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question:
      "Hồ Chí Minh cho rằng đoàn kết quốc tế là điều kiện sống còn để cách mạng Việt Nam đi đến thắng lợi.",
    options: ["Đúng", "Sai"],
    correctAnswer: 0,
  },
  {
    id: 4,
    question:
      "Những lực lượng nào Hồ Chí Minh chủ trương tranh thủ đoàn kết quốc tế?",
    options: [
      "Phong trào cộng sản và công nhân quốc tế",
      "Phong trào giải phóng dân tộc",
      "Các lực lượng tiến bộ, yêu chuộng hòa bình, dân chủ và công lý",
      "Tất cả các đáp án trên",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question:
      "Năm 1920, Hồ Chí Minh đã tham gia tổ chức quốc tế nào, mở ra cơ sở cho tư tưởng đoàn kết quốc tế?",
    options: [
      "Quốc tế Cộng sản (Quốc tế III)",
      "Hội Liên hiệp thuộc địa",
      "Quốc tế Xã hội",
      "Quốc tế Thanh niên",
    ],
    correctAnswer: 0,
  },
  {
    id: 6,
    question:
      'Hồ Chí Minh luôn coi đoàn kết quốc tế là "một trong những nhân tố quyết định thắng lợi của cách mạng Việt Nam".',
    options: ["Đúng", "Sai"],
    correctAnswer: 0,
  },
  {
    id: 7,
    question:
      "Trong kháng chiến chống Pháp và chống Mỹ, sự ủng hộ của bạn bè thế giới dành cho Việt Nam thể hiện ở:",
    options: [
      "Biểu tình phản đối chiến tranh xâm lược",
      "Viện trợ vật chất, vũ khí, y tế",
      "Sự lên tiếng của các tổ chức quốc tế ủng hộ Việt Nam",
      "Tất cả các đáp án trên",
    ],
    correctAnswer: 3,
  },
  {
    id: 8,
    question:
      "Hồ Chí Minh khẳng định, cách mạng Việt Nam chỉ có thể dựa vào nội lực, không cần tranh thủ sự giúp đỡ quốc tế.",
    options: ["Đúng", "Sai"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Trong tư tưởng Hồ Chí Minh, đoàn kết quốc tế dựa trên nguyên tắc:",
    options: [
      "Bình đẳng, tôn trọng lẫn nhau",
      "Hợp tác cùng có lợi",
      "Vì mục tiêu hòa bình, độc lập dân tộc, dân chủ và tiến bộ xã hội",
      "Cả A, B, C",
    ],
    correctAnswer: 3,
  },
  {
    id: 10,
    question:
      "Phong trào giải phóng dân tộc có đặc điểm gì trong việc hỗ trợ cách mạng Việt Nam?",
    options: [
      "Đấu tranh vì hòa bình, dân chủ, công bằng xã hội",
      "Chung mục tiêu lật đổ chủ nghĩa thực dân, giành độc lập",
      "Hỗ trợ về lý luận, tổ chức và tinh thần cho cách mạng Việt Nam",
      "Không có sự hỗ trợ nào đáng kể",
    ],
    correctAnswer: 1,
  },
  {
    id: 11,
    question:
      "Hồ Chí Minh từng gửi thư, điện cảm ơn sự ủng hộ của nhân dân các nước nào trong kháng chiến chống Mỹ?",
    options: [
      "Liên Xô, Trung Quốc, Cuba, Lào, Campuchia",
      "Mỹ, Nhật Bản, Hàn Quốc",
      "Thái Lan, Singapore, Malaysia",
      "Ấn Độ, Myanmar, Bhutan",
    ],
    correctAnswer: 0,
  },
  {
    id: 12,
    question:
      "Hồ Chí Minh đánh giá cao tinh thần quốc tế vô sản và coi đó là cơ sở lý luận để đoàn kết cách mạng Việt Nam với phong trào cộng sản thế giới.",
    options: ["Đúng", "Sai"],
    correctAnswer: 0,
  },
  {
    id: 13,
    question:
      "Theo Hồ Chí Minh, mục tiêu cuối cùng của đoàn kết quốc tế là:",
    options: [
      "Giành thắng lợi cho cách mạng Việt Nam",
      "Đem lại độc lập, tự do, hạnh phúc cho các dân tộc bị áp bức và nhân loại",
      "Khẳng định vị thế Việt Nam trên trường quốc tế",
      "Tăng cường quan hệ ngoại giao",
    ],
    correctAnswer: 1,
  },
  {
    id: 14,
    question:
      "Một trong những biểu tượng tiêu biểu của tình đoàn kết quốc tế với Việt Nam trong thế kỷ XX là:",
    options: [
      "Tượng đài Fidel Castro bên cạnh nhân dân Việt Nam",
      "Lời kêu gọi phản chiến của nhân dân Mỹ",
      "Sự hỗ trợ y tế từ nhân dân Cuba trong thời kỳ khó khăn",
      "Tất cả các đáp án trên",
    ],
    correctAnswer: 3,
  },
  {
    id: 15,
    question:
      "Thông điệp quan trọng nhất mà tư tưởng Hồ Chí Minh về đoàn kết quốc tế gửi tới hôm nay là gì?",
    options: [
      "Đặt lợi ích quốc gia lên trên hết, không cần quan hệ quốc tế",
      "Hội nhập quốc tế trên tinh thần độc lập, tự chủ, hòa bình, hợp tác cùng phát triển",
      "Chỉ đoàn kết trong phạm vi khu vực châu Á",
      "Ưu tiên phát triển kinh tế, gác lại quan hệ chính trị",
    ],
    correctAnswer: 1,
  },
];

const quizDataMap: QuizDataMap = {
  "mat-tran-dan-toc": matTranDanTocQuizData,
  "doan-ket-quoc-te": doanKetQuocTeQuizData,
  default: defaultQuizData,
};

// Function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const chapter = searchParams.get("chapter") || "default";
  const currentQuizData = quizDataMap[chapter] || defaultQuizData;

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(() =>
    shuffleArray(currentQuizData)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(currentQuizData.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [participantName, setParticipantName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const uid = useAuthStore((s) => s.uid);
  
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Update quiz data when chapter changes
  useEffect(() => {
    const newQuizData = quizDataMap[chapter] || defaultQuizData;
    setShuffledQuestions(shuffleArray(newQuizData));
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(newQuizData.length).fill(-1));
    setShowResults(false);
    setSelectedOption(-1);
    setIsSaved(false);
    setParticipantName("");
    setStartTime(Date.now());
    setElapsedTime(0);
  }, [chapter]);

  // Handle active countdown / elapsed time ticker
  useEffect(() => {
    if (showResults) return;
    const interval = setInterval(() => {
      setElapsedTime(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, showResults]);

  // Load leaderboard when results are shown
  useEffect(() => {
    if (showResults) {
      const scoresRef = ref(db, "scores");
      get(scoresRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const list = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            
            // Sort by: score desc, timeTaken asc (if exists), then timestamp asc
            const filtered = list
              .filter((item) => item.chapter === chapter)
              .sort((a, b) => {
                if (b.score !== a.score) {
                  return b.score - a.score;
                }
                const aTime = a.timeTaken !== undefined ? a.timeTaken : 999999;
                const bTime = b.timeTaken !== undefined ? b.timeTaken : 999999;
                if (aTime !== bTime) {
                  return aTime - bTime;
                }
                return a.timestamp - b.timestamp;
              })
              .slice(0, 10);
            setLeaderboard(filtered);
          } else {
            setLeaderboard([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching leaderboard:", err);
        });
    }
  }, [showResults, chapter, isSaved]);

  const saveScore = async () => {
    const trimmed = participantName.trim();
    if (!trimmed) {
      alert("Vui lòng nhập tên của bạn!");
      return;
    }
    setIsSaving(true);
    try {
      const score = calculateScore();
      const percentage = (score / shuffledQuestions.length) * 100;
      
      const newScoreRef = push(ref(db, "scores"));
      await set(newScoreRef, {
        name: trimmed,
        score: score,
        total: shuffledQuestions.length,
        percentage: percentage,
        chapter: chapter,
        timestamp: Date.now(),
        uid: uid || "anonymous",
        timeTaken: elapsedTime
      });
      setIsSaved(true);
    } catch (err) {
      console.error("Error saving score:", err);
      alert("Không thể lưu điểm số. Vui lòng kiểm tra lại kết nối hoặc Rules của bạn!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(selectedAnswers[currentQuestion + 1]);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(selectedAnswers[currentQuestion - 1]);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return (
        score + (answer === shuffledQuestions[index].correctAnswer ? 1 : 0)
      );
    }, 0);
  };

  const resetQuiz = () => {
    setShuffledQuestions(shuffleArray(currentQuizData));
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(currentQuizData.length).fill(-1));
    setShowResults(false);
    setSelectedOption(-1);
    setIsSaved(false);
    setParticipantName("");
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / shuffledQuestions.length) * 100;

    return (
      <div
        className="min-h-screen relative p-6 pt-20"
        style={{
          backgroundImage: 'url("/imgs/Quiz đại đoàn kết dân tộc.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      >
        {/* Background overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.85) 50%, rgba(15, 23, 42, 0.9) 100%)",
            zIndex: 2,
          }}
        ></div>
        <div className="max-w-4xl mx-auto relative z-40">
          {/* Header Results */}
          <div className="bg-black/80 rounded-3xl shadow-2xl p-8 mb-6">
            <div className="flex items-center justify-between text-white mb-6">
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <h1 className="text-3xl font-bold">Kết quả Quiz</h1>
              </div>
              <button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Làm lại Quiz
              </button>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-2">
                {score}/{shuffledQuestions.length}
              </div>
              <p className="text-xl text-gray-300 mb-4">
                Bạn đã trả lời đúng {score} trên {shuffledQuestions.length} câu
                hỏi
              </p>

              <div className="mb-6">
                {percentage >= 80 ? (
                  <div className="text-green-400">
                    <p className="text-lg font-semibold">Xuất sắc! 🎉</p>
                    <p>
                      Bạn đã nắm vững kiến thức về đại đoàn kết dân tộc trong tư
                      tưởng Hồ Chí Minh.
                    </p>
                  </div>
                ) : percentage >= 60 ? (
                  <div className="text-blue-400">
                    <p className="text-lg font-semibold">Khá tốt! 👍</p>
                    <p>
                      Bạn có hiểu biết cơ bản, hãy tiếp tục học tập để nâng cao
                      kiến thức.
                    </p>
                  </div>
                ) : (
                  <div className="text-orange-400">
                    <p className="text-lg font-semibold">
                      Cần cố gắng thêm! 💪
                    </p>
                    <p>Hãy ôn tập lại các nội dung về đại đoàn kết dân tộc.</p>
                  </div>
                )}
              </div>

              {/* Save Score Section */}
              <div className="mt-8 border-t border-gray-700/50 pt-6 max-w-md mx-auto">
                {!isSaved ? (
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block text-left">
                      ✍️ Ghi danh vào Bảng Vàng danh dự
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập tên/lớp của bạn để lưu..."
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        disabled={isSaving}
                        className="flex-1 bg-black/60 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-red-500 placeholder:text-gray-600 disabled:opacity-50"
                      />
                      <button
                        onClick={saveScore}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-500 hover:to-yellow-500 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center min-w-[100px]"
                      >
                        {isSaving ? "Đang lưu..." : "Lưu Điểm"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-green-400 text-sm font-semibold animate-pulse">
                    ✨ Điểm số của bạn đã được ghi nhận trên Bảng Vàng!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leaderboard Panel */}
          <div className="bg-black/80 rounded-3xl shadow-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-700/50 pb-3">
              <span className="text-xl">🏆</span>
              <h2 className="text-lg font-bold text-yellow-500 uppercase tracking-wider">
                Bảng Vàng Danh Dự
              </h2>
            </div>
            
            {leaderboard.length === 0 ? (
              <p className="text-gray-500 text-xs text-center py-4">Chưa có kết quả thi cử nào được lưu trữ. Hãy là người đầu tiên!</p>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((item, idx) => {
                  const isGold = idx === 0;
                  const isSilver = idx === 1;
                  const isBronze = idx === 2;
                  
                  let rankIcon = <span className="text-gray-400 font-bold text-xs">#{idx + 1}</span>;
                  if (isGold) rankIcon = <span className="text-lg">🥇</span>;
                  if (isSilver) rankIcon = <span className="text-lg">🥈</span>;
                  if (isBronze) rankIcon = <span className="text-lg">🥉</span>;
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                        item.uid === uid 
                          ? "border-yellow-500 bg-yellow-500/10" 
                          : "border-gray-800 bg-gray-900/30 text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 flex justify-center">{rankIcon}</div>
                        <div>
                          <span className={`font-semibold text-sm block ${item.uid === uid ? "text-yellow-400" : "text-gray-200"}`}>
                            {item.name}
                          </span>
                          <span className="text-[10px] text-gray-500 block">
                            {new Date(item.timestamp).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="font-extrabold text-sm text-yellow-400 block">{item.score} / {item.total}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                          {item.timeTaken !== undefined && (
                            <span className="bg-gray-800 px-1 py-0.5 rounded text-gray-300 font-mono text-[9px]">
                              ⏱️ {Math.floor(item.timeTaken / 60)}:{(item.timeTaken % 60).toString().padStart(2, '0')}
                            </span>
                          )}
                          <span>({Math.round(item.percentage)}%)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            {shuffledQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className="bg-black/80 rounded-2xl border-2 border-gray-700 p-6"
                >
                  {/* Question */}
                  <h3 className="text-white font-semibold mb-4 leading-relaxed">
                    {question.question}
                  </h3>

                  {/* User's Answer */}
                  {userAnswer !== -1 && (
                    <div
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 mb-3 ${
                        isCorrect
                          ? "border-green-500 bg-green-500/10"
                          : "border-red-500 bg-red-500/10"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          isCorrect ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {isCorrect ? (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            isCorrect ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {isCorrect ? "Đáp án đúng: " : "Đáp án sai: "}
                          {question.options[userAnswer]}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Correct Answer (if user was wrong) */}
                  {!isCorrect && (
                    <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-green-500 bg-green-500/10">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-green-400 font-medium">
                          Đáp án đúng:{" "}
                          {question.options[question.correctAnswer]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-6 pt-20"
      style={{
        backgroundImage: 'url("/imgs/Quiz đại đoàn kết dân tộc.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
      }}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.85) 50%, rgba(15, 23, 42, 0.9) 100%)",
          zIndex: 2,
        }}
      ></div>
      <div className="max-w-4xl w-full relative z-40">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Progress */}
          <div className="bg-gradient-to-r from-red-600 to-yellow-600 p-6">
            <div className="flex items-center justify-between text-white mb-4">
              <h1 className="text-2xl font-bold">Quiz: Đại Đoàn Kết Dân Tộc</h1>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold bg-black/20 px-3 py-1 rounded-full border border-white/10">
                  ⏱️ {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-lg font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  {currentQuestion + 1}/{shuffledQuestions.length}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
                {shuffledQuestions[currentQuestion].question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {shuffledQuestions[currentQuestion].options.map(
                (option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                      selectedOption === index
                        ? "border-red-500 bg-red-50 text-red-700 shadow-lg"
                        : "border-gray-200 hover:border-red-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 text-sm font-semibold ${
                          selectedOption === index
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {String.fromCharCode(97 + index)}
                      </span>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </button>
                )
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentQuestion === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700 transform hover:scale-105"
                }`}
              >
                ← Câu trước
              </button>

              <button
                onClick={handleNext}
                disabled={selectedOption === -1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedOption === -1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-yellow-600 text-white hover:from-red-700 hover:to-yellow-700 transform hover:scale-105 shadow-lg"
                }`}
              >
                {currentQuestion === shuffledQuestions.length - 1
                  ? "Hoàn thành"
                  : "Câu tiếp →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
