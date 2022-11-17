import React from "react";
import "./Brand.css";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const brand = [
  { title: "IPFS", src: "https://docs.ipfs.tech/images/ipfs-logo.svg" },
  // { title : "Quicknode", src : "https://www.quicknode.com/assets/marketing/logos/qn-logo-q-cd946cc9bb24d4fa91db3db292e2607e8f5969045724bdff8c7f0ffd9b1b6a1b.svg" },
  // { title : "Chainlink", src : "https://cryptologos.cc/logos/chainlink-link-logo.png?v=023" },
  // { title : "Polygon", src : "https://moralis.io/wp-content/uploads/2022/08/cryptoLogosPolygon.svg" },
];

const Brand = () => {
  const data = useAccount();

  return (
    data.isConnected && (
      <div className="brand section-padding" id="brand">
        {brand &&
          brand.map((data) => (
            <Link to={`/chains/${data.title}`}>
              <div>
                <img src={data.src} alt={data.title} />
                <p>{data.title}</p>
              </div>
            </Link>
          ))}
      </div>
    )
  );
};

export default Brand;
