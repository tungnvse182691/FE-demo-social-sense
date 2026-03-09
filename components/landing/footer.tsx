import Image from "next/image"

export function LandingFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Logo col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="Logo" width={35} height={35} style={{ mixBlendMode: "multiply" }} />
              <span className="text-base font-bold text-gray-900">SocialSense</span>
              <span className="text-xs font-medium text-gray-400">.vn</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-400">
              {"Hiểu rõ. Đăng đúng. Tăng trưởng."}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {["Facebook", "TikTok", "LinkedIn"].map((social) => (
                <span
                  key={social}
                  className="rounded-md bg-gray-200 px-2 py-1 text-[10px] text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {"Sản phẩm"}
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {[
                "Tính năng",
                "Bảng giá",
                "Changelog",
                "Roadmap",
              ].map((link) => (
                <span key={link} className="cursor-pointer text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {link}
                </span>
              ))}
            </nav>
          </div>

          {/* Col 3 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {"Công ty"}
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {[
                "Về chúng tôi",
                "Blog",
                "Tuyển dụng",
                "Báo chí",
              ].map((link) => (
                <span key={link} className="cursor-pointer text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {link}
                </span>
              ))}
            </nav>
          </div>

          {/* Col 4 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {"Hỗ trợ"}
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {[
                "Trung tâm hỗ trợ",
                "Liên hệ",
                "Chính sách bảo mật",
                "Điều khoản sử dụng",
              ].map((link) => (
                <span key={link} className="cursor-pointer text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {link}
                </span>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          {"© 2025 SocialSense.vn · Made in Vietnam"}
        </div>
      </div>
    </footer>
  )
}
