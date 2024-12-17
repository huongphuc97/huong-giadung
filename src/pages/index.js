import Head from "next/head";
import {useState, useRef} from "react";

import json from "../json/product.json"
import styles from "../styles/Home.module.css";

export default function Home() {
  const [tagClicked, setTagClicked] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [listProducts, setListProducts] = useState(json.products)
  const inputRef = useRef(null)

  const navigateLink = (url) => {
    window.open(url, "_blank");
  }

  const tagClick = (tag) => {
    setInputValue('')
    setTagClicked(tagClicked?.id === tag.id ? null : tag)
    setListProducts(tagClicked?.id === tag.id ? json.products : json.products.filter(i => i.id === tag.id))
  }

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onChangeInput()
    }
  }

  const shareWebsite = () => {
    navigator.share({
      url: window.location.href
    })
  }

  const onClearInput = () => {
    setInputValue('')
    setListProducts(json.products)
    inputRef.current.focus()
  }

  const onChangeInput = () => {
    setTagClicked(null);    // Reset the clicked tag

    // Check if there is an input value
    if (inputValue) {
      // Filter products based on the input value
      const filteredProducts = json.products
          .filter(product => {
            // Check if the product name or any sub-product name contains the input value
            const productMatches = product.name.includes(inputValue);
            const subProductsMatches = product.subProducts.some(subProduct =>
                subProduct.subProductName.includes(inputValue)
            );
            return productMatches || subProductsMatches;
          })
          .map(product => {
            // Filter sub-products inside the matched products
            const filteredSubProducts = product.subProducts.filter(subProduct =>
                subProduct.subProductName.includes(inputValue)
            );

            // Return the product with filtered sub-products
            return {
              ...product,
              subProducts: filteredSubProducts
            };
          });

      setListProducts(filteredProducts); // Set the filtered products
    } else {
      setListProducts(json.products)
    }
  };


  return (
      <>
        <Head>
          <title>Trang cá nhân của Hương gia dụng</title>
          <meta name="description" content="Generated by create next app"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <div className={styles.mainPage}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <span>Huong</span>
              <div className={styles.headerShare} onClick={shareWebsite}>
                <svg width="24" height="24" className="" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M21.707 11.293L13.707 3.29304C13.5672 3.15318 13.389 3.05794 13.195 3.01935C13.0011 2.98075 12.8 3.00055 12.6173 3.07622C12.4346 3.1519 12.2784 3.28006 12.1685 3.4445C12.0586 3.60894 12 3.80227 12 4.00004V7.54496C9.2683 7.7978 6.72926 9.0609 4.87973 11.0871C3.0302 13.1132 2.00331 15.7567 2 18.5V20C1.99998 20.2077 2.06463 20.4102 2.18495 20.5795C2.30528 20.7488 2.47532 20.8764 2.67147 20.9446C2.86762 21.0128 3.08014 21.0183 3.27954 20.9602C3.47893 20.9022 3.65531 20.7835 3.78418 20.6206C4.76383 19.4556 5.96583 18.4974 7.31997 17.8022C8.6741 17.1069 10.1532 16.6885 11.6709 16.5713C11.7207 16.565 11.8457 16.5552 12 16.5454V20C12 20.1978 12.0586 20.3911 12.1685 20.5556C12.2784 20.72 12.4346 20.8482 12.6173 20.9238C12.8 20.9995 13.0011 21.0193 13.195 20.9807C13.389 20.9421 13.5672 20.8469 13.707 20.707L21.707 12.707C21.7999 12.6142 21.8735 12.504 21.9238 12.3827C21.9741 12.2614 21.9999 12.1313 21.9999 12C21.9999 11.8687 21.9741 11.7387 21.9238 11.6174C21.8735 11.4961 21.7999 11.3859 21.707 11.293ZM14 17.586V15.5C14 15.3687 13.9742 15.2387 13.9239 15.1173C13.8737 14.996 13.8 14.8857 13.7072 14.7929C13.6143 14.7 13.5041 14.6263 13.3827 14.5761C13.2614 14.5258 13.1313 14.5 13 14.5C12.7451 14.5 11.7041 14.5494 11.4385 14.585C8.74307 14.8333 6.17736 15.8573 4.05176 17.5332C4.29289 15.3276 5.33918 13.2884 6.99026 11.8061C8.64135 10.3239 10.7812 9.50275 13 9.50004C13.1313 9.50007 13.2614 9.47423 13.3827 9.42399C13.5041 9.37374 13.6143 9.30008 13.7072 9.20722C13.8 9.11435 13.8737 9.0041 13.9239 8.88276C13.9742 8.76142 14 8.63137 14 8.50004V6.4141L19.5859 12L14 17.586Z"
                      fill="#333333">
                  </path>
                </svg>
              </div>
            </div>
          </div>

          {/*<div className={styles.body}>*/}
          {/*  <div className={styles.bodyBlock}>*/}
          {/*    <div className={styles.infoBlock}>*/}
          {/*      <div className={styles.contentInfo}>*/}
          {/*        <div className={styles.contentInfoImage}></div>*/}
          {/*        <span className={styles.contentInfoName}>Huong</span>*/}
          {/*      </div>*/}
          {/*      <div className={styles.contentInfoSocial}>*/}
          {/*        <a href="https://www.facebook.com/profile.php?id=100004821517733">*/}
          {/*          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
          {/*               xmlns="http://www.w3.org/2000/svg"*/}
          {/*               className={styles.svg}>*/}
          {/*            <rect width="24" height="24" fill="url(#paint0_linear_6303_252268)"></rect>*/}
          {/*            <path*/}
          {/*                d="M15.8782 13.0417L16.3411 10.0254H13.4469V8.06803C13.4469 7.24284 13.8512 6.43847 15.1474 6.43847H16.4632V3.87044C16.4632 3.87044 15.2692 3.66666 14.1276 3.66666C11.7441 3.66666 10.1862 5.11133 10.1862 7.72656V10.0254H7.53674V13.0417H10.1862V20.3333H13.4469V13.0417H15.8782Z"*/}
          {/*                fill="white"></path>*/}
          {/*            <defs>*/}
          {/*              <linearGradient id="paint0_linear_6303_252268" x1="12" y1="0" x2="12"*/}
          {/*                              y2="23.9288"*/}
          {/*                              gradientUnits="userSpaceOnUse">*/}
          {/*                <stop stopColor="#18ACFE"></stop>*/}
          {/*                <stop offset="1" stopColor="#0163E0"></stop>*/}
          {/*              </linearGradient>*/}
          {/*            </defs>*/}
          {/*          </svg>*/}
          {/*        </a>*/}

          {/*        <a href="https://instagram.com/__th.vy__">*/}
          {/*          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
          {/*               xmlns="http://www.w3.org/2000/svg"*/}
          {/*               className={styles.svg}>*/}
          {/*            <rect width="24" height="24" fill="url(#paint0_radial_6303_252278)"></rect>*/}
          {/*            <rect width="24" height="24" fill="url(#paint1_radial_6303_252278)"></rect>*/}
          {/*            <rect width="24" height="24" fill="url(#paint2_radial_6303_252278)"></rect>*/}
          {/*            <path*/}
          {/*                d="M17.25 7.875C17.25 8.49632 16.7463 9 16.125 9C15.5037 9 15 8.49632 15 7.875C15 7.25368 15.5037 6.75 16.125 6.75C16.7463 6.75 17.25 7.25368 17.25 7.875Z"*/}
          {/*                fill="white"></path>*/}
          {/*            <path fillRule="evenodd" clipRule="evenodd"*/}
          {/*                  d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75ZM12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"*/}
          {/*                  fill="white"></path>*/}
          {/*            <path fillRule="evenodd" clipRule="evenodd"*/}
          {/*                  d="M4.5 11.7C4.5 9.17976 4.5 7.91965 4.99047 6.95704C5.4219 6.11031 6.11031 5.4219 6.95704 4.99047C7.91965 4.5 9.17976 4.5 11.7 4.5H12.3C14.8202 4.5 16.0804 4.5 17.043 4.99047C17.8897 5.4219 18.5781 6.11031 19.0095 6.95704C19.5 7.91965 19.5 9.17976 19.5 11.7V12.3C19.5 14.8202 19.5 16.0804 19.0095 17.043C18.5781 17.8897 17.8897 18.5781 17.043 19.0095C16.0804 19.5 14.8202 19.5 12.3 19.5H11.7C9.17976 19.5 7.91965 19.5 6.95704 19.0095C6.11031 18.5781 5.4219 17.8897 4.99047 17.043C4.5 16.0804 4.5 14.8202 4.5 12.3V11.7ZM11.7 6H12.3C13.5849 6 14.4583 6.00117 15.1334 6.05633C15.7911 6.11006 16.1274 6.20745 16.362 6.32698C16.9265 6.6146 17.3854 7.07354 17.673 7.63803C17.7926 7.87263 17.8899 8.20893 17.9437 8.86656C17.9988 9.54169 18 10.4151 18 11.7V12.3C18 13.5849 17.9988 14.4583 17.9437 15.1334C17.8899 15.7911 17.7926 16.1274 17.673 16.362C17.3854 16.9265 16.9265 17.3854 16.362 17.673C16.1274 17.7926 15.7911 17.8899 15.1334 17.9437C14.4583 17.9988 13.5849 18 12.3 18H11.7C10.4151 18 9.54169 17.9988 8.86656 17.9437C8.20893 17.8899 7.87263 17.7926 7.63803 17.673C7.07354 17.3854 6.6146 16.9265 6.32698 16.362C6.20745 16.1274 6.11006 15.7911 6.05633 15.1334C6.00117 14.4583 6 13.5849 6 12.3V11.7C6 10.4151 6.00117 9.54169 6.05633 8.86656C6.11006 8.20893 6.20745 7.87263 6.32698 7.63803C6.6146 7.07354 7.07354 6.6146 7.63803 6.32698C7.87263 6.20745 8.20893 6.11006 8.86656 6.05633C9.54169 6.00117 10.4151 6 11.7 6Z"*/}
          {/*                  fill="white"></path>*/}
          {/*            <defs>*/}
          {/*              <radialGradient id="paint0_radial_6303_252278" cx="0" cy="0" r="1"*/}
          {/*                              gradientUnits="userSpaceOnUse"*/}
          {/*                              gradientTransform="translate(8.57143 18) rotate(-55.3758) scale(21.8739)">*/}
          {/*                <stop stopColor="#B13589"></stop>*/}
          {/*                <stop offset="0.79309" stopColor="#C62F94"></stop>*/}
          {/*                <stop offset="1" stopColor="#8A3AC8"></stop>*/}
          {/*              </radialGradient>*/}
          {/*              <radialGradient id="paint1_radial_6303_252278" cx="0" cy="0" r="1"*/}
          {/*                              gradientUnits="userSpaceOnUse"*/}
          {/*                              gradientTransform="translate(7.71429 24.8571) rotate(-65.1363) scale(19.3665)">*/}
          {/*                <stop stopColor="#E0E8B7"></stop>*/}
          {/*                <stop offset="0.444662" stopColor="#FB8A2E"></stop>*/}
          {/*                <stop offset="0.71474" stopColor="#E2425C"></stop>*/}
          {/*                <stop offset="1" stopColor="#E2425C" stopOpacity="0"></stop>*/}
          {/*              </radialGradient>*/}
          {/*              <radialGradient id="paint2_radial_6303_252278" cx="0" cy="0" r="1"*/}
          {/*                              gradientUnits="userSpaceOnUse"*/}
          {/*                              gradientTransform="translate(-1.28571 0.857143) rotate(-8.1301) scale(33.335 7.13002)">*/}
          {/*                <stop offset="0.156701" stopColor="#406ADC"></stop>*/}
          {/*                <stop offset="0.467799" stopColor="#6A45BE"></stop>*/}
          {/*                <stop offset="1" stopColor="#6A45BE" stopOpacity="0"></stop>*/}
          {/*              </radialGradient>*/}
          {/*            </defs>*/}
          {/*          </svg>*/}
          {/*        </a>*/}

          {/*        <a href="www.tiktok.com/@thaovyy1802">*/}
          {/*          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
          {/*               xmlns="http://www.w3.org/2000/svg"*/}
          {/*               className={styles.svg}>*/}
          {/*            <rect width="24" height="24" fill="black"></rect>*/}
          {/*            <path*/}
          {/*                d="M7.2816 14.3704C7.37927 13.5617 7.71094 13.1089 8.33596 12.6448C9.23024 12.0161 10.3473 12.3717 10.3473 12.3717V10.2623C10.6189 10.2553 10.8906 10.2714 11.1592 10.3104V13.0251C11.1592 13.0251 10.0425 12.6695 9.14817 13.2984C8.5235 13.7622 8.19115 14.2153 8.09382 15.024C8.09077 15.4631 8.17318 16.0371 8.55266 16.5335C8.45884 16.4854 8.3632 16.4306 8.26576 16.369C7.4298 15.8077 7.27753 14.9655 7.2816 14.3704ZM15.7717 6.36183C15.1565 5.68771 14.9239 5.00709 14.8398 4.52896H15.6137C15.6137 4.52896 15.4594 5.78262 16.5839 7.01548L16.5995 7.03206C16.2965 6.84141 16.0185 6.61637 15.7717 6.36183ZM19.4998 8.27304V10.9331C19.4998 10.9331 18.5122 10.8944 17.7814 10.7085C16.761 10.4485 16.1051 10.0497 16.1051 10.0497C16.1051 10.0497 15.652 9.76527 15.6154 9.74545V15.2385C15.6154 15.5444 15.5316 16.3082 15.2763 16.9453C14.9429 17.7787 14.4284 18.3257 14.3338 18.4375C14.3338 18.4375 13.7081 19.177 12.6043 19.6749C11.6092 20.1241 10.7356 20.1128 10.4745 20.1241C10.4745 20.1241 8.96437 20.1839 7.60547 19.3008C7.31162 19.1062 7.03732 18.8857 6.78613 18.6423L6.79292 18.6472C8.15215 19.5303 9.66196 19.4705 9.66196 19.4705C9.92343 19.4591 10.797 19.4705 11.7917 19.0213C12.8945 18.5233 13.5213 17.7839 13.5213 17.7839C13.6149 17.6721 14.1317 17.125 14.4637 16.2913C14.7184 15.6546 14.8028 14.8904 14.8028 14.5846V9.09213C14.8395 9.11228 15.2922 9.39668 15.2922 9.39668C15.2922 9.39668 15.9484 9.79583 16.9689 10.0555C17.7 10.2415 18.6872 10.2801 18.6872 10.2801V8.19568C19.025 8.27141 19.3129 8.29189 19.4998 8.27304Z"*/}
          {/*                fill="#EE1D52"></path>*/}
          {/*            <path*/}
          {/*                d="M18.6875 8.19568V10.2795C18.6875 10.2795 17.7003 10.2408 16.9692 10.0549C15.9487 9.79485 15.2925 9.39603 15.2925 9.39603C15.2925 9.39603 14.8398 9.11163 14.8032 9.09148V14.5852C14.8032 14.8911 14.7194 15.6552 14.464 16.292C14.1307 17.1257 13.6162 17.6727 13.5216 17.7845C13.5216 17.7845 12.8955 18.524 11.792 19.0219C10.7973 19.4711 9.92374 19.4598 9.66227 19.4711C9.66227 19.4711 8.15247 19.531 6.79323 18.6478L6.78645 18.643C6.64294 18.504 6.50786 18.3573 6.38187 18.2035C5.94812 17.6747 5.68224 17.0493 5.61543 16.8709C5.61532 16.8701 5.61532 16.8693 5.61543 16.8686C5.50793 16.5585 5.28207 15.8139 5.31293 15.0926C5.36753 13.8201 5.81518 13.039 5.93354 12.8434C6.247 12.3098 6.65469 11.8324 7.13847 11.4324C7.56537 11.0872 8.04926 10.8126 8.57027 10.6198C9.13351 10.3934 9.73664 10.272 10.3473 10.2623V12.3717C10.3473 12.3717 9.23022 12.0174 8.33627 12.6448C7.71126 13.1089 7.37959 13.5617 7.28192 14.3704C7.27785 14.9655 7.43012 15.8077 8.2654 16.3693C8.36284 16.4311 8.45847 16.4859 8.5523 16.5338C8.69822 16.7235 8.87583 16.8888 9.07795 17.023C9.8939 17.5395 10.5776 17.5755 11.4519 17.2401C12.0348 17.0158 12.4737 16.5104 12.6771 15.9504C12.805 15.6006 12.8033 15.2486 12.8033 14.8846V4.52896H14.8381C14.9222 5.00709 15.1548 5.68771 15.77 6.36183C16.0168 6.61637 16.2947 6.84141 16.5978 7.03206C16.6874 7.12469 17.1452 7.58266 17.7329 7.86382C18.0368 8.00915 18.3571 8.1205 18.6875 8.19568V8.19568Z"*/}
          {/*                fill="white"></path>*/}
          {/*            <path*/}
          {/*                d="M4.80566 16.2231V16.2247L4.85615 16.3615C4.85035 16.3456 4.83159 16.2972 4.80566 16.2231Z"*/}
          {/*                fill="#69C9D0"></path>*/}
          {/*            <path*/}
          {/*                d="M8.57051 10.6198C8.0495 10.8126 7.56561 11.0872 7.1387 11.4324C6.65477 11.8333 6.24718 12.3117 5.93411 12.8463C5.81576 13.0413 5.3681 13.823 5.3135 15.0955C5.28264 15.8168 5.5085 16.5614 5.61601 16.8715C5.61589 16.8723 5.61589 16.8731 5.61601 16.8738C5.68383 17.0506 5.94869 17.676 6.38244 18.2065C6.50844 18.3602 6.64352 18.5069 6.78702 18.6459C6.32723 18.3411 5.91716 17.9726 5.57023 17.5525C5.14021 17.0282 4.87501 16.4093 4.80583 16.2267C4.80574 16.2254 4.80574 16.2241 4.80583 16.2228V16.2205C4.69798 15.9107 4.47144 15.1657 4.50298 14.4435C4.55758 13.171 5.00523 12.3899 5.12359 12.1943C5.43657 11.6596 5.84417 11.1812 6.32818 10.7804C6.755 10.4351 7.23891 10.1605 7.75999 9.96779C8.08501 9.83854 8.42361 9.74319 8.76992 9.68338C9.29183 9.59607 9.82487 9.5885 10.3492 9.66096V10.2623C9.738 10.2719 9.13428 10.3932 8.57051 10.6198Z"*/}
          {/*                fill="#69C9D0"></path>*/}
          {/*            <path*/}
          {/*                d="M14.8399 4.52897H12.8051V14.8849C12.8051 15.2489 12.8051 15.6 12.6789 15.9507C12.4734 16.5104 12.0363 17.0158 11.4537 17.2401C10.579 17.5768 9.89535 17.5395 9.07974 17.023C8.87727 16.8894 8.69921 16.7246 8.55273 16.5354C9.24761 16.8907 9.86958 16.8845 10.6401 16.5881C11.2224 16.3638 11.6602 15.8584 11.865 15.2984C11.9932 14.9486 11.9915 14.5966 11.9915 14.2329V3.875H14.8012C14.8012 3.875 14.7697 4.13243 14.8399 4.52897ZM18.6876 7.6194V8.19569C18.3578 8.12039 18.038 8.00904 17.7347 7.86383C17.147 7.58267 16.6891 7.1247 16.5996 7.03206C16.7035 7.09744 16.8113 7.15691 16.9225 7.21018C17.637 7.55212 18.3407 7.65418 18.6876 7.6194Z"*/}
          {/*                fill="#69C9D0"></path>*/}
          {/*          </svg>*/}
          {/*        </a>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*  <div className={styles.bodyBlock}>*/}
          {/*    <div className={styles.inputSearch}>*/}
          {/*      <span>Sản phẩm</span>*/}

          {/*      <div className={styles.inputBlock}>*/}
          {/*        <input*/}
          {/*            ref={inputRef}*/}
          {/*            className={styles.input}*/}
          {/*            value={inputValue}*/}
          {/*            placeholder="Tìm kiếm sản phẩm theo tên"*/}
          {/*            onChange={(e) => setInputValue(e.target.value)}*/}
          {/*            onKeyDown={onKeyDownHandler}*/}
          {/*        />*/}

          {/*        {inputValue && (*/}
          {/*            <div className={styles.inputClear} onClick={onClearInput}>*/}
          {/*              <svg fillRule="evenodd" viewBox="64 64 896 896" focusable="false"*/}
          {/*                   data-icon="close-circle"*/}
          {/*                   width="1em" height="1em" fill="currentColor" aria-hidden="true">*/}
          {/*                <path*/}
          {/*                    d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>*/}
          {/*              </svg>*/}
          {/*            </div>*/}
          {/*        )}*/}

          {/*        <div className={styles.inputSvg} onClick={onChangeInput}>*/}
          {/*          <svg width="17" height="18" viewBox="0 0 17 18" fill="none"*/}
          {/*               xmlns="http://www.w3.org/2000/svg">*/}
          {/*            <g clipPath="url(#clip0_580_420061)">*/}
          {/*              <rect width="17" height="17" transform="translate(0 0.496094)" fill="white"*/}
          {/*                    fillOpacity="0.01"></rect>*/}
          {/*              <path*/}
          {/*                  d="M3.62755 4.08977C6.10361 1.65758 10.1181 1.65758 12.5941 4.08977C14.9866 6.43982 15.0674 10.2007 12.8366 12.646L15.4801 15.2431C15.5359 15.2979 15.5367 15.3876 15.4819 15.4434C15.4813 15.444 15.4807 15.4446 15.4801 15.4452L14.9351 15.9806C14.88 16.0347 14.7916 16.0347 14.7365 15.9806L12.0688 13.3599C9.57937 15.3185 5.93528 15.1644 3.62755 12.8975C1.15149 10.4653 1.15149 6.52197 3.62755 4.08977ZM4.37477 4.82375C2.31139 6.85059 2.31139 10.1367 4.37477 12.1636C6.43815 14.1904 9.78355 14.1904 11.8469 12.1636C13.9103 10.1367 13.9103 6.85059 11.8469 4.82375C9.78355 2.79692 6.43815 2.79692 4.37477 4.82375Z"*/}
          {/*                  fill="white"></path>*/}
          {/*            </g>*/}
          {/*            <defs>*/}
          {/*              <clipPath id="clip0_580_420061">*/}
          {/*                <rect width="17" height="17" fill="white"*/}
          {/*                      transform="translate(0 0.496094)"></rect>*/}
          {/*              </clipPath>*/}
          {/*            </defs>*/}
          {/*          </svg>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}

          {/*    <div className={styles.tabsBlock}>*/}
          {/*      {json.products.map((product) => (*/}
          {/*          <div*/}
          {/*              className={`${styles.tabName} ${product.id === tagClicked?.id ? styles.activeTab : ''}`}*/}
          {/*              key={product.id}*/}
          {/*              onClick={() => tagClick(product)}*/}
          {/*          >*/}
          {/*            {product.name} ({product.subProducts.length})*/}
          {/*          </div>*/}
          {/*      ))}*/}
          {/*    </div>*/}

          {/*    {listProducts.map((product) => (*/}
          {/*        <div className={styles.productItem} key={product.id}>*/}
          {/*          <span className={styles.productName}>{product.name}</span>*/}
          {/*          <div className={styles.cardsGrid}>*/}
          {/*            {product.subProducts.map((p) => (*/}
          {/*                <div className={styles.cardItem} key={p.subProductId}*/}
          {/*                     onClick={() => navigateLink(p.url)}>*/}
          {/*                  <div className={styles.cardName}>{p.subProductName}</div>*/}
          {/*                </div>*/}
          {/*            ))}*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*    ))}*/}

          {/*    {!listProducts.length && (*/}
          {/*        <div className={styles.noData}>*/}
          {/*          <img*/}
          {/*              src="https://image.passio.eco/page-builder/ssp-landing-page/product-searching-empty-image.png"/>*/}
          {/*          <div>Không tìm thấy kết quả nào</div>*/}
          {/*          <div>Hãy tìm từ khóa khác</div>*/}
          {/*        </div>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </>
  );
}