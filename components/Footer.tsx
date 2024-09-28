import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Press Releases</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><Link href="#">Sell products on AmazonClone</Link></li>
              <li><Link href="#">Become an Affiliate</Link></li>
              <li><Link href="#">Advertise Your Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">AmazonClone Payment Products</h3>
            <ul className="space-y-2">
              <li><Link href="#">AmazonClone Business Card</Link></li>
              <li><Link href="#">Shop with Points</Link></li>
              <li><Link href="#">Reload Your Balance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><Link href="#">Your Account</Link></li>
              <li><Link href="#">Your Orders</Link></li>
              <li><Link href="#">Shipping Rates & Policies</Link></li>
              <li><Link href="#">Returns & Replacements</Link></li>
              <li><Link href="#">Help</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; product-page. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}