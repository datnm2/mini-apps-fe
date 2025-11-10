"use client";

import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Quote {
  text: string;
  text_vn: string;
  author: string;
}

const quotes: Quote[] = [
  { text: "The only way to do great work is to love what you do.", text_vn: "Cách duy nhất để làm việc tuyệt vời là yêu thích những gì bạn làm.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", text_vn: "Thành công không phải là đích cuối, thất bại không phải là định mệnh: chính lòng can đảm tiếp tục mới là điều quan trọng.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", text_vn: "Tin rằng bạn có thể và bạn đã đi được nửa đường rồi.", author: "Theodore Roosevelt" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", text_vn: "Tương lai thuộc về những người tin vào vẻ đẹp của ước mơ.", author: "Eleanor Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", text_vn: "Không quan trọng bạn đi chậm như thế nào miễn là bạn không dừng lại.", author: "Confucius" },
  { text: "Everything you've ever wanted is on the other side of fear.", text_vn: "Mọi thứ bạn từng muốn đều ở phía bên kia của nỗi sợ hãi.", author: "George Addair" },
  { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", text_vn: "Thành công không phải là bạn leo cao đến đâu, mà là bạn tạo ra sự khác biệt tích cực cho thế giới như thế nào.", author: "Roy T. Bennett" },
  { text: "Don't watch the clock; do what it does. Keep going.", text_vn: "Đừng nhìn đồng hồ; hãy làm như nó làm. Tiếp tục đi.", author: "Sam Levenson" },
  { text: "The only impossible journey is the one you never begin.", text_vn: "Hành trình duy nhất không thể thực hiện được là hành trình bạn không bao giờ bắt đầu.", author: "Tony Robbins" },
  { text: "In the middle of every difficulty lies opportunity.", text_vn: "Giữa mỗi khó khăn là một cơ hội.", author: "Albert Einstein" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", text_vn: "Những gì ở phía sau và phía trước chúng ta chỉ là chuyện nhỏ so với những gì ở bên trong chúng ta.", author: "Ralph Waldo Emerson" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", text_vn: "Thời điểm tốt nhất để trồng cây là 20 năm trước. Thời điểm tốt thứ hai là bây giờ.", author: "Tục ngữ Trung Hoa" },
  { text: "Your time is limited, don't waste it living someone else's life.", text_vn: "Thời gian của bạn có hạn, đừng lãng phí nó để sống cuộc đời của người khác.", author: "Steve Jobs" },
  { text: "The only person you are destined to become is the person you decide to be.", text_vn: "Người duy nhất bạn được định sẵn để trở thành là người bạn quyết định trở thành.", author: "Ralph Waldo Emerson" },
  { text: "I find that the harder I work, the more luck I seem to have.", text_vn: "Tôi nhận thấy rằng càng làm việc chăm chỉ, tôi càng có vẻ may mắn hơn.", author: "Thomas Jefferson" },
  { text: "Do what you can, with what you have, where you are.", text_vn: "Làm những gì bạn có thể, với những gì bạn có, ở nơi bạn đang ở.", author: "Theodore Roosevelt" },
  { text: "The way to get started is to quit talking and begin doing.", text_vn: "Cách để bắt đầu là ngừng nói và bắt đầu hành động.", author: "Walt Disney" },
  { text: "Don't be afraid to give up the good to go for the great.", text_vn: "Đừng sợ từ bỏ cái tốt để theo đuổi cái tuyệt vời.", author: "John D. Rockefeller" },
  { text: "I alone cannot change the world, but I can cast a stone across the water to create many ripples.", text_vn: "Một mình tôi không thể thay đổi thế giới, nhưng tôi có thể ném một viên đá xuống nước để tạo ra nhiều gợn sóng.", author: "Mother Teresa" },
  { text: "What we think, we become.", text_vn: "Những gì chúng ta nghĩ, chúng ta sẽ trở thành.", author: "Buddha" },
  { text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", text_vn: "Hai mươi năm sau, bạn sẽ thất vọng hơn về những điều bạn không làm hơn là những điều bạn đã làm.", author: "Mark Twain" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", text_vn: "Giới hạn duy nhất cho việc thực hiện ngày mai sẽ là những nghi ngờ của ngày hôm nay.", author: "Franklin D. Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", text_vn: "Chính trong những khoảnh khắc tối tăm nhất, chúng ta phải tập trung để nhìn thấy ánh sáng.", author: "Aristotle" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", text_vn: "Đừng vương vấn quá khứ, đừng mơ mộng tương lai, hãy tập trung tâm trí vào hiện tại.", author: "Buddha" },
  { text: "Life is 10% what happens to you and 90% how you react to it.", text_vn: "Cuộc sống là 10% những gì xảy ra với bạn và 90% cách bạn phản ứng với nó.", author: "Charles R. Swindoll" },
  { text: "The best revenge is massive success.", text_vn: "Cách trả thù tốt nhất là thành công vang dội.", author: "Frank Sinatra" },
  { text: "You miss 100% of the shots you don't take.", text_vn: "Bạn bỏ lỡ 100% những cú sút bạn không thực hiện.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", text_vn: "Dù bạn nghĩ bạn có thể hay bạn nghĩ bạn không thể, bạn đều đúng.", author: "Henry Ford" },
  { text: "The two most important days in your life are the day you are born and the day you find out why.", text_vn: "Hai ngày quan trọng nhất trong đời bạn là ngày bạn sinh ra và ngày bạn tìm ra lý do tại sao.", author: "Mark Twain" },
  { text: "Whatever you are, be a good one.", text_vn: "Dù bạn là ai, hãy là một người tốt.", author: "Abraham Lincoln" },
  { text: "Dream big and dare to fail.", text_vn: "Mơ lớn và dám thất bại.", author: "Norman Vaughan" },
  { text: "Courage is grace under pressure.", text_vn: "Can đảm là sự tao nhã dưới áp lực.", author: "Ernest Hemingway" },
  { text: "The only way to achieve the impossible is to believe it is possible.", text_vn: "Cách duy nhất để đạt được điều không thể là tin rằng nó có thể.", author: "Charles Kingsleigh" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", text_vn: "Khó khăn thường chuẩn bị cho những người bình thường một số phận phi thường.", author: "C.S. Lewis" },
  { text: "Everything you can imagine is real.", text_vn: "Mọi thứ bạn có thể tưởng tượng đều có thật.", author: "Pablo Picasso" },
];

export default function GodQuoteApp() {
  const { t, locale } = useLanguage();
  const [name, setName] = useState("");
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const getRandomQuote = () => {
    if (!name.trim()) return;

    setIsRevealing(true);

    // Add a dramatic delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsRevealing(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-full shadow-2xl animate-pulse">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t("apps.godquote.title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("apps.godquote.subtitle")}
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
        <div className="max-w-md mx-auto">
          <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            {t("apps.godquote.nameLabel")}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && getRandomQuote()}
            placeholder={t("apps.godquote.namePlaceholder")}
            className="w-full px-6 py-4 text-center text-xl border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white mb-6 transition-all"
          />
          <button
            onClick={getRandomQuote}
            disabled={!name.trim() || isRevealing}
            className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            {isRevealing ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                {t("apps.godquote.revealing")}
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                {t("apps.godquote.button")}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quote Display */}
      {currentQuote && !isRevealing && (
        <div className="animate-fade-in">
          <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <p className="text-2xl md:text-3xl font-semibold mb-2">
                  {t("apps.godquote.greeting")} {name},
                </p>
                <p className="text-lg text-white/80">
                  {t("apps.godquote.message")}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6">
                <div className="text-6xl text-white/30 mb-4">"</div>
                <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-6 text-center">
                  {locale === 'vi' ? currentQuote.text_vn : currentQuote.text}
                </p>
                <div className="text-6xl text-white/30 text-right">"</div>
              </div>

              <div className="text-center">
                <p className="text-xl font-semibold">
                  — {currentQuote.author}
                </p>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={getRandomQuote}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <RefreshCw className="w-5 h-5" />
                  {t("apps.godquote.another")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 max-w-2xl mx-auto">
          <p className="text-gray-700 dark:text-gray-300">
            {t("apps.godquote.info")}
          </p>
        </div>
      </div>
    </div>
  );
}
