import { Product } from '@/types';
import { generatedShirts } from './generated-shirts.ts';

// Import product images
import kurtiWhitePink from '@/assets/kurti-white-pink.jpg';
import kurtiPinkCotton from '@/assets/kurti-pink-cotton.jpg';
import blackCottonMaxi from '@/assets/black-cotton-maxi.jpg';
import kurtiCombo2 from '@/assets/kurti-combo-2.jpg';

// Anarkali multiple images
import Anarkali from '@/assets/7tvi20/first_1.avif';
import Anarkali2 from '@/assets/7tvi20/first_1_2.webp';
import Anarkali3 from '@/assets/7tvi20/first_1_3.avif';
import Anarkali4 from '@/assets/7tvi20/first_1_4.avif';

import k816k_4 from '@/assets/4k816k/4k816k_4.webp';
import k816k_3 from '@/assets/4k816k/4k816k_3.webp';
import k816k_2 from '@/assets/4k816k/4k816k_2.webp';
import k816k_1 from '@/assets/4k816k/4k816k_1.webp';


import h7w1v_1 from '@/assets/2h7w1v/2h7w1v_1.webp';
import h7w1v_2 from '@/assets/2h7w1v/2h7w1v_2.webp';
import h7w1v_3 from '@/assets/2h7w1v/2h7w1v_3.webp';
import h7w1v_4 from '@/assets/2h7w1v/2h7w1v_4.webp';


import cbki1 from '@/assets/63cbki/63cbki_1.webp';
import cbki2 from '@/assets/63cbki/63cbki_2.webp';
import cbki3 from '@/assets/63cbki/63cbki_3.webp';
import cbki4 from '@/assets/63cbki/63cbki_4.webp';


import frcm1 from '@/assets/77frcm/77frcm_1.webp';
import frcm2 from '@/assets/77frcm/77frcm_1.webp';
import frcm3 from '@/assets/77frcm/77frcm_3.webp';
import frcm4 from '@/assets/77frcm/77frcm_4.webp';


import mg7nd1 from '@/assets/4mg7nd/4mg7nd_1.webp';
import mg7nd2 from '@/assets/4mg7nd/4mg7nd_2.avif';
import mg7nd3 from '@/assets/4mg7nd/4mg7nd_3.webp';
import mg7nd4 from '@/assets/4mg7nd/4mg7nd_4.avif';


import jtmad1 from '@/assets/5jtmad/5jtmad_1.avif';
import jtmad2 from '@/assets/5jtmad/5jtmad_2.webp';
import jtmad3 from '@/assets/5jtmad/5jtmad_3.avif';
import jtmad4 from '@/assets/5jtmad/5jtmad_4.avif';

import sjykz1 from '@/assets/jtmad1/jtmad1__1.webp';
import sjykz2 from '@/assets/jtmad1/jtmad1_2.webp';
import sjykz3 from '@/assets/jtmad1/jtmad1_3.avif';
import sjykz4 from '@/assets/jtmad1/jtmad1_4.avif';

import wkcil1 from '@/assets/8wkcil/8wkcil_1.avif';
import wkcil2 from '@/assets/8wkcil/8wkcil_2.avif';
import wkcil3 from '@/assets/8wkcil/8wkcil_3.avif';
import wkcil4 from '@/assets/8wkcil/8wkcil_4.webp';

import d7i3r1 from '@/assets/6d7i3r/6d7i3r_1.avif';
import d7i3r2 from '@/assets/6d7i3r/6d7i3r_2.avif';
import d7i3r3 from '@/assets/6d7i3r/6d7i3r_3.avif';
import d7i3r4 from '@/assets/6d7i3r/6d7i3r_4.avif'; 

import tdmh1 from '@/assets/55tdmh/55tdmh_1.avif';
import tdmh2 from '@/assets/55tdmh/55tdmh_2.avif';
import tdmh3 from '@/assets/55tdmh/55tdmh_3.avif';
import tdmh4 from '@/assets/55tdmh/55tdmh_4.avif';

import tylxj1 from '@/assets/5tylxj/5tylxj_1.avif';
import tylxj2 from '@/assets/5tylxj/5tylxj_2.avif';
import tylxj3 from '@/assets/5tylxj/5tylxj_3.avif';
import tylxj4 from '@/assets/5tylxj/5tylxj_4.webp';

import ojpif from '@/assets/9ojpif/9ojpif_1.webp';


import eqip1 from '@/assets/65eqip/65eqip.webp';
import eqip2 from '@/assets/65eqip/65eqip_2.avif';
import eqip3 from '@/assets/65eqip/65eqip_3.webp';
import eqip4 from '@/assets/65eqip/65eqip_4.webp';


import fg5c1 from '@/assets/86fg5c/86fg5c_1.webp';
import fg5c2 from '@/assets/86fg5c/86fg5c_2.webp';
import fg5c3 from '@/assets/86fg5c/86fg5c_3.avif';
import fg5c4 from '@/assets/86fg5c/86fg5c_4.webp';


import bsk3i1 from '@/assets/bsk3i/bsk3i_1.webp';
import bsk3i2 from '@/assets/bsk3i/bsk3i_2.webp';
import bsk3i3 from '@/assets/bsk3i/bsk3i_3.avif';
import bsk3i4 from '@/assets/bsk3i/bsk3i_4.webp';

import l71dg1 from '@/assets/9l71dg/9l71dg_1.webp';
import l71dg2 from '@/assets/9l71dg/9l71dg_2.webp';
import l71dg3 from '@/assets/9l71dg/9l71dg_3.webp';
import l71dg4 from '@/assets/9l71dg/9l71dg_4.webp';

import a65a61 from '@/assets/7a65a6/7a65a6_1.webp';
import a65a62 from '@/assets/7a65a6/7a65a6_2.avif';
import a65a63 from '@/assets/7a65a6/7a65a6_3.webp';
import a65a64 from '@/assets/7a65a6/7a65a6_4.webp';


import uot641 from '@/assets/7uot64/7uot64_1.avif';
import uot642 from '@/assets/7uot64/7uot64_2.avif';
import uot643 from '@/assets/7uot64/7uot64_3.avif';
import uot644 from '@/assets/7uot64/7uot64_4.webp';

import z49pf1 from '@/assets/4z49pf/4z49pf_1.webp';
import z49pf2 from '@/assets/4z49pf/4z49pf_2.webp';
import z49pf3 from '@/assets/4z49pf/4z49pf_3.avif';
import z49pf4 from '@/assets/4z49pf/4z49pf_4.avif';

import mpzxj1 from '@/assets/8mpzxj/8mpzxj_1.webp';
import mpzxj2 from '@/assets/8mpzxj/8mpzxj_2.webp';
import mpzxj3 from '@/assets/8mpzxj/8mpzxj_3.avif';
import mpzxj4 from '@/assets/8mpzxj/8mpzxj_4.webp';


// saries

import bqyk_1 from '@/assets/88bqyk/88bqyk_1.avif'
import bqyk_2 from '@/assets/88bqyk/88bqyk_2.webp'
import bqyk_3 from '@/assets/88bqyk/88bqyk_3.avif'
import bqyk_4 from '@/assets/88bqyk/88bqyk_4.avif'


import bhz0_1 from '@/assets/11bhz0/11bhz0_1.webp';
import bhz0_2 from '@/assets/11bhz0/11bhz0_2.webp';
import bhz0_3 from '@/assets/11bhz0/11bhz0_3.avif';
import bhz0_4 from '@/assets/11bhz0/11bhz0_4.avif';

import glm0_1 from '@/assets/82glm0/82glm0_1.webp';
import glm0_2 from '@/assets/82glm0/82glm0_2.webp';
import glm0_3 from '@/assets/82glm0/82glm0_3.avif';
import glm0_4 from '@/assets/82glm0/82glm0_4.avif';

import h3oo_1 from '@/assets/90h3oo/90h3oo_1.avif';
import h3oo_2 from '@/assets/90h3oo/90h3oo_2.webp';
import h3oo_3 from '@/assets/90h3oo/90h3oo_3.avif';
import h3oo_4 from '@/assets/90h3oo/90h3oo_4.avif';

import x0pi5 from '@/assets/7x0pi5_1.webp';

import svggo_1 from '@/assets/6svggo/6svggo_1.webp';
import svggo_2 from '@/assets/6svggo/6svggo_2.webp';
import svggo_3 from '@/assets/6svggo/6svggo_3.webp';
import svggo_4 from '@/assets/6svggo/6svggo_4.webp';

import fp46_1 from '@/assets/67fp46/67fp46_1.webp';
import fp46_2 from '@/assets/67fp46/67fp46_2.webp';
import fp46_3 from '@/assets/67fp46/67fp46_3.avif';
import fp46_4 from '@/assets/67fp46/67fp46_4.avif';

import k8c84_1 from '@/assets/7k8c84/7k8c84_1.webp';
import k8c84_2 from '@/assets/7k8c84/7k8c84_2.avif';
import k8c84_3 from '@/assets/7k8c84/7k8c84_3.webp';
import k8c84_4 from '@/assets/7k8c84/7k8c84_4.webp';

import i0e3j_1 from '@/assets/6i0e3j/6i0e3j_1.avif';
import i0e3j_2 from '@/assets/6i0e3j/6i0e3j_2.avif';
import i0e3j_3 from '@/assets/6i0e3j/6i0e3j_3.avif';
import i0e3j_4 from '@/assets/6i0e3j/6i0e3j_4.avif';

import lxnug_1 from '@/assets/lxnug/lxnug_1.webp';
import lxnug_2 from '@/assets/lxnug/lxnug_2.webp';
import lxnug_3 from '@/assets/lxnug/lxnug_3.avif';
import lxnug_4 from '@/assets/lxnug/lxnug_4.avif';

import ky2ve_1 from '@/assets/7ky2ve/7ky2ve_1.avif';
import ky2ve_2 from '@/assets/7ky2ve/7ky2ve_2.avif';
import ky2ve_3 from '@/assets/7ky2ve/7ky2ve_3.avif';
import ky2ve_4 from '@/assets/7ky2ve/7ky2ve_4.avif';

import md_1 from '@/assets/8mdshh/8mdshh_1.avif';
import md_2 from '@/assets/8mdshh/8mdshh_2.avif';
import md_3 from '@/assets/8mdshh/8mdshh_3.avif';
import md_4 from '@/assets/8mdshh/8mdshh_4.avif';

import m7bhh_1 from '@/assets/2m7bhh/2m7bhh_1.avif';
import m7bhh_2 from '@/assets/2m7bhh/2m7bhh_2.avif';
import m7bhh_3 from '@/assets/2m7bhh/2m7bhh_3.avif';
import m7bhh_4 from '@/assets/2m7bhh/2m7bhh_4.avif';

import xx48r_1 from '@/assets/6xx48r/6xx48r_1.avif';
import xx48r_2 from '@/assets/6xx48r/6xx48r_2.avif';
import xx48r_3 from '@/assets/6xx48r/6xx48r_3.avif';
import xx48r_4 from '@/assets/6xx48r/6xx48r_4.avif';

import qyv_1 from '@/assets/915qyv/915qyv_1.avif';
import qyv_2 from '@/assets/915qyv/915qyv_2.avif';
import qyv_3 from '@/assets/915qyv/915qyv_3.avif';
import qyv_4 from '@/assets/915qyv/915qyv_4.avif';

import heef0_1 from '@/assets/3heef0/3heef0_1.avif';
import heef0_2 from '@/assets/3heef0/3heef0_2.avif';
import heef0_3 from '@/assets/3heef0/3heef0_3.avif';
import heef0_4 from '@/assets/3heef0/3heef0_4.avif';

import gvcg_1 from '@/assets/52gvcg/52gvcg_1.avif';
import gvcg_2 from '@/assets/52gvcg/52gvcg_2.avif';
import gvcg_3 from '@/assets/52gvcg/52gvcg_3.avif';
import gvcg_4 from '@/assets/52gvcg/52gvcg_4.avif';

import vuqma_1 from '@/assets/8vuqma/8vuqma_1.avif';
import vuqma_2 from '@/assets/8vuqma/8vuqma_2.avif';
import vuqma_3 from '@/assets/8vuqma/8vuqma_3.avif';
import vuqma_4 from '@/assets/8vuqma/8vuqma_4.avif';

import svux5_1 from '@/assets/7svux5/7svux5_1.avif';
import svux5_2 from '@/assets/7svux5/7svux5_2.avif';
import svux5_3 from '@/assets/7svux5/7svux5_3.avif';
import svux5_4 from '@/assets/7svux5/7svux5_4.avif';

import s0zru_1 from '@/assets/7s0zru/7s0zru_1.avif';
import s0zru_2 from '@/assets/7s0zru/7s0zru_2.avif';
import s0zru_3 from '@/assets/7s0zru/7s0zru_3.avif';
import s0zru_4 from '@/assets/7s0zru/7s0zru_4.avif';


import dk1it_1 from '@/assets/5dk1it/5dk1it_1.avif';
import dk1it_2 from '@/assets/5dk1it/5dk1it_2.avif';
import dk1it_3 from '@/assets/5dk1it/5dk1it_3.avif';
import dk1it_4 from '@/assets/5dk1it/5dk1it_4.avif';

import rx562_1 from '@/assets/5rx562/5rx562_1.avif';
import rx562_2 from '@/assets/5rx562/5rx562_2.avif';
import rx562_3 from '@/assets/5rx562/5rx562_3.avif';
import rx562_4 from '@/assets/5rx562/5rx562_4.avif';

import kdjln_1 from '@/assets/8kdjln/8kdjln_1.avif';
import kdjln_2 from '@/assets/8kdjln/8kdjln_2.avif';
import kdjln_3 from '@/assets/8kdjln/8kdjln_3.avif';
import kdjln_4 from '@/assets/8kdjln/8kdjln_4.avif';


import q25ko_1 from '@/assets/7q25ko/7q25ko_1.avif';
import q25ko_2 from '@/assets/7q25ko/7q25ko_2.avif';
import q25ko_3 from '@/assets/7q25ko/7q25ko_3.avif';
import q25ko_4 from '@/assets/7q25ko/7q25ko_4.avif';



// meanswear


import auq88_1 from '@/assets/auq88/auq88.avif'
import auq88_2 from '@/assets/auq88/auq88_2.avif'
import auq88_3 from '@/assets/auq88/auq88_3.avif'
import auq88_4 from '@/assets/auq88/auq88_4.avif'

import kv4b_1 from '@/assets/1kv4b/1kv4b_1.avif';
import kv4b_2 from '@/assets/1kv4b/1kv4b_2.avif';
import kv4b_3 from '@/assets/1kv4b/1kv4b_3.avif';
import kv4b_4 from '@/assets/1kv4b/1kv4b_4.avif';

import d7un_1 from '@/assets/3d7un/3d7un_1.avif';
import d7un_2 from '@/assets/3d7un/3d7un_2.avif';
import d7un_3 from '@/assets/3d7un/3d7un_3.avif';
import d7un_4 from '@/assets/3d7un/3d7un_4.avif';

import qau1g_1 from '@/assets/qau1g/qau1g_1.avif';
import qau1g_2 from '@/assets/qau1g/qau1g_2.avif';
import qau1g_3 from '@/assets/qau1g/qau1g_3.avif';
import qau1g_4 from '@/assets/qau1g/qau1g_4.avif';

import lt60_1 from '@/assets/3lt60/3lt60_1.avif';
import lt60_2 from '@/assets/3lt60/3lt60_2.avif';
import lt60_3 from '@/assets/3lt60/3lt60_3.avif';
import lt60_4 from '@/assets/3lt60/3lt60_4.avif';

import kyq9_1 from '@/assets/4kyq9/4kyq9_1.avif'
import kyq9_2 from '@/assets/4kyq9/4kyq9_2.avif'
import kyq9_3 from '@/assets/4kyq9/4kyq9_3.avif'
import kyq9_4 from '@/assets/4kyq9/4kyq9_4.avif'

import ct_1 from '@/assets/377ct/377ct_1.avif';
import ct_2 from '@/assets/377ct/377ct_2.avif';
import ct_3 from '@/assets/377ct/377ct_3.avif';
import ct_4 from '@/assets/377ct/377ct_4.avif';


import nz2t_1 from '@/assets/13nz2t/13nz2t_1.avif'
import nz2t_2 from '@/assets/13nz2t/13nz2t_2.avif'
import nz2t_3 from '@/assets/13nz2t/13nz2t_3.avif'

import f_12sss_1 from '@/assets/1f2sss/1f2sss_1.avif';
import f_12sss_2 from '@/assets/1f2sss/1f2sss_2.avif';
import f_12sss_3 from '@/assets/1f2sss/1f2sss_3.avif';
import f_12sss_4 from '@/assets/1f2sss/1f2sss_4.avif';

import jwuos_1 from '@/assets/1jwuos/1jwuos_1.avif';
import jwuos_2 from '@/assets/1jwuos/1jwuos_2.avif';
import jwuos_3 from '@/assets/1jwuos/1jwuos_3.avif';
import jwuos_4 from '@/assets/1jwuos/1jwuos_4.avif';

import o9tx7_1 from '@/assets/o9tx7/o9tx7_1.avif';
import o9tx7_2 from '@/assets/o9tx7/o9tx7_2.avif';
import o9tx7_3 from '@/assets/o9tx7/o9tx7_3.avif';
import o9tx7_4 from '@/assets/o9tx7/o9tx7_4.avif';

import popwm_1 from '@/assets/8popwm/8popwm_1.avif';
import popwm_2 from '@/assets/8popwm/8popwm_2.avif';
import popwm_3 from '@/assets/8popwm/8popwm_3.avif';
import popwm_4 from '@/assets/8popwm/8popwm_4.avif';



export const products: Product[] = [


  // Meanswear
  
  {
    id: "auq88",
    name: "Fatty Mouse Men's Shirts",
    price: 99,
    originalPrice: 254,
    discount: 38,
    rating: 3.8,
    reviews: 8705,
    image: auq88_1,
    images: [auq88_1,auq88_2,auq88_3,auq88_4],
    category: "combo2",
    sizes: [ "M", "L", "XL", "XXL"],
    description: "Good to go for any casual formal or party wear look.",
    fabric: "Cotton Blend",
    care: "Machine Wash",
    shipping: "10-12 Days",
    details: {
      kurta: [
        "Fabric - Cotton Blend",
        "Sleeve Length : Long Sleeves",
        "Pattern : Solid",
        "Net Quantity (N) : 1"
      ]
    }
  },
  {
  "id": "kv4b",
  "name": "Frekman Stylish Cotton Blend Check Men's Shirt",
  "price": 99,
  "originalPrice": 2254,
  "discount": 96,
  "rating": 3.8,
  "reviews": 8705,
  "image": kv4b_1,
  "images": [kv4b_1, kv4b_2, kv4b_3, kv4b_4],
  "category": "combo2",
  "sizes": ["S", "M", "L"],
  "description": "Freeman shirt created from the finest quality cotton fabric, featuring a natural textured feel that adds sophistication while keeping it relaxed all day long. Its versatile checked design with full sleeves makes it perfect for casual, formal, or party wear.",
  "fabric": "Cotton",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Cotton",
      "Sleeve Length : Long Sleeves",
      "Pattern : Checked",
      "Net Quantity (N) : 1"
    ]
  }
  
  },
  {
  "id": "3d7un",
  "name": "Men's Cotton T-Shirt Half Sleeves Plain Cotton T-Shirt",
  "price": 99,
  "originalPrice": 2149,
  "discount": 95,
  "rating": 3.8,
  "reviews": 8705,
  "image": d7un_1,
  "images": [d7un_1, d7un_2, d7un_3, d7un_4],
  "category": "combo2",
  "sizes": ["XS", "S", "L", "XL"],
  "description": "Men's plain cotton T-shirt with half sleeves, designed for comfort and simplicity. A versatile choice for everyday wear that combines breathable fabric with a clean casual look.",
  "fabric": "Cotton Blend",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Cotton Blend",
      "Sleeve Length : Half Sleeves",
      "Pattern : Plain",
      "Net Quantity (N) : 1"
    ]
  }
  },
  {
  "id": "qau1g",
  "name": "Comfy Fashionista Men Shirts",
  "price": 99,
  "originalPrice": 342,
  "discount": 71,
  "rating": 3.8,
  "reviews": 8705,
  "image": qau1g_1,
  "images": [qau1g_1, qau1g_2, qau1g_3, qau1g_4],
  "category": "combo2",
  "sizes": ["M", "L", "XL", "XXL"],
  "description": "One piece of men’s cotton shirt featuring a comfortable fit, long sleeves, and printed pattern. Made in India, perfect for casual or semi-formal wear.",
  "fabric": "Cotton",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Cotton",
      "Sleeve Length : Long Sleeves",
      "Pattern : Printed",
      "Net Quantity (N) : 1",
      "Country of Origin : India"
    ]
  }
  },
  {
  "id": "3lt60",
  "name": "Stylish Men's Polyester T-Shirts",
  "price": 99,
  "originalPrice": 164,
  "discount": 40,
  "rating": 3.8,
  "reviews": 8705,
  "image": lt60_1,
  "images": [lt60_1, lt60_2, lt60_3, lt60_4],
  "category": "combo2",
  "sizes": ["L", "XL"],
  "description": "Stylish men's polyester T-shirts, breathable and durable, perfect for daily wear. Long sleeves with a comfortable fit, ideal for casual or office use. Made in India.",
  "fabric": "Polyester",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Polyester",
      "Sleeve Length : Long Sleeve",
      "Pattern : Plain",
      "Net Quantity (N) : 1",
      "Country of Origin : India"
    ]
  }
  },
  {
  "id": "4kyq9",
  "name": "Black & White Shirts for Men",
  "price": 99,
  "originalPrice": 415,
  "discount": 76,
  "rating": 3.8,
  "reviews": 8705,
  "image": kyq9_1,
  "images": [kyq9_1, kyq9_2, kyq9_3, kyq9_4],
  "category": "combo2",
  "sizes": ["L", "XXL", "XXXL"],
  "description": "Peter Europe white and check shirts for men, designed for comfort and style. Available in plus sizes, perfect for casual, office, or semi-formal occasions.",
  "fabric": "Cotton",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Cotton",
      "Length : Standard",
      "Pattern : Check / White",
      "Net Quantity (N) : 1"
    ]
  }
  },
  {
  "id": "377ct",
  "name": "Men's Party Wear T-Shirt Short Sleeve Polo Cotton T-Shirt",
  "price": 99,
  "originalPrice": 159,
  "discount": 38,
  "rating": 3.8,
  "reviews": 8705,
  "image": ct_1,
  "images": [ct_1, ct_2, ct_3, ct_4],
  "category": "combo2",
  "sizes": ["M", "L", "XL"],
  "description": "Men's party wear cotton T-shirt with short sleeves and polo style. Breathable and comfortable, perfect for summer and casual outings, with a trendy buttoned placket for style.",
  "fabric": "Cotton Blend",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Cotton Blend",
      "Sleeve Length : Long Sleeve",
      "Pattern : Plain",
      "Net Quantity (N) : 1"
    ]
  }
  },
  {
  "id": "13nz2t",
  "name": "Track Pants",
  "price": 99,
  "originalPrice": 282,
  "discount": 65,
  "rating": 3.8,
  "reviews": 8705,
  "image": nz2t_1,
  "images": [nz2t_1, nz2t_2, nz2t_3],
  "category": "combo2",
  "sizes": ["28", "30", "32"],
  "description": "Comfortable track pants suitable for running, gym, or casual wear. Designed for a regular fit with breathable fabric for all-day comfort.",
  "fabric": "Cotton Blend",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Cotton Blend",
      "Fit : Regular",
      "Pattern : Plain",
      "Net Quantity (N) : 1"
    ]
  }
  },
  {
  "id": "1f2sss",
  "name": "ARDLOR Men's Regular Fit Cotton Blend Formal Trousers - Pack of 2",
  "price": 99,
  "originalPrice": 705,
  "discount": 86,
  "rating": 3.8,
  "reviews": 8705,
  "image": f_12sss_1,
  "images": [f_12sss_1, f_12sss_2, f_12sss_3, f_12sss_4],
  "category": "combo2",
  "sizes": ["M", "L", "XL", "XXL"],
  "description": "ARDLOR men's regular fit formal trousers in cotton blend, sold as a pack of 2. Designed for comfort and style, suitable for office, formal occasions, or casual wear.",
  "fabric": "Cotton Blend",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Cotton Blend",
      "Fit : Regular",
      "Pattern : Solid",
      "Net Quantity (N) : 2"
    ]
  }
  },
  {
  "id": "1jwuos",
  "name": "Men's Shorts Boxer",
  "price": 99,
  "originalPrice": 212,
  "discount": 53,
  "rating": 3.8,
  "reviews": 8705,
  "image": jwuos_1,
  "images": [jwuos_1, jwuos_2, jwuos_3, jwuos_4],
  "category": "combo2",
  "sizes": ["28", "30", "32", "Free Size"],
  "description": "Modern men's boxer shorts made from mercerized cotton blend for comfort and functionality. Ideal for casual wear or lounging at home. Made in India.",
  "fabric": "Cotton Blend",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Cotton Blend",
      "Pattern : Check",
      "Net Quantity (N) : 3",
      "Country of Origin : India"
    ]
  }
  },
  {
  "id": "o9tx7",
  "name": "Men Formal Shirts",
  "price": 99,
  "originalPrice": 266,
  "discount": 63,
  "rating": 3.8,
  "reviews": 8705,
  "image": o9tx7_1,
  "images": [o9tx7_1, o9tx7_2, o9tx7_3, o9tx7_4],
  "category": "combo2",
  "sizes": ["M", "L", "XL"],
  "description": "Men's formal cotton blend shirt with long sleeves, perfect for office or formal occasions. Comfortable fit with a classic style. Made in India.",
  "fabric": "Cotton Blend",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Fabric - Cotton Blend",
      "Sleeve Length : Long Sleeve",
      "Pattern : Plain",
      "Net Quantity (N) : 1",
      "Country of Origin : India"
    ]
  }
  },
  {
  "id": "8popwm",
  "name": "Stylish Gym Vests",
  "price": 99,
  "originalPrice": 277,
  "discount": 64,
  "rating": 4.2,
  "reviews": 5421,
  "image": popwm_1,
  "images": [popwm_1, popwm_2, popwm_3, popwm_4],
  "category": "combo2",
  "sizes": ["S", "M", "XL", "XXL", "XXXL"],
  "description": "Stylish gym vests made for comfort and performance. Ideal for workouts and daily fitness routines. Made in India.",
  "fabric": "Cotton Blend",
  "care": "Machine Wash",
  "shipping": "10-12 Days",
  "details": {
    "kurta": [
      "Net Quantity (N) : 2",
      "Country of Origin : India"
    ]
  }
},















  //kurties
  {
    id: 1,
    name: "White & Pink Fairytale Cotton Suit Set",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.0,
    reviews: 1191,
    image: kurtiWhitePink,
    images: [kurtiWhitePink], // only main image
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Beautiful cotton suit set perfect for casual and formal occasions.",
    fabric: "Cotton (pure cotton)",
    care: "Dry Clean",
    shipping: "12-15 Days",
    details: {
      kurta: [
        "Fabric - Cotton (pure cotton)",
        "Kali cut design",
        "Kurta Length - 47-48 inch",
        "Front Neck - 7.5 inch",
        "Back Neck - Closed",
        "Sleeves - 24 inch"
      ],
      pants: [
        "Fabric - Cotton",
        "Length - 38-40 inch"
      ],
      dupatta: [
        "Fabric - Mul Mul",
        "Length - 2.5 mtr"
      ]
    }
  },
  {
    id: 2,
    name: "Vamika Pink Cotton Suit Set",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.5,
    reviews: 642,
    image: kurtiPinkCotton,
    images: [kurtiPinkCotton],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Elegant pink cotton suit set with traditional embroidery.",
    fabric: "Cotton",
    care: "Dry Clean",
    shipping: "12-15 Days",
    details: {
      kurta: [
        "Fabric - Cotton",
        "Kurta Length - 45 inch",
        "Round Neck with embroidery",
        "Sleeves - 22 inch"
      ],
      pants: ["Fabric - Cotton Blend", "Length - 38 inch"],
      dupatta: ["Fabric - Chiffon", "2.25 mtr embroidered"]
    }
  },
  {
    id: 4,
    name: "Aamodini Black Cotton Maxi",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.5,
    reviews: 5448,
    image: blackCottonMaxi,
    images: [blackCottonMaxi],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Stylish black cotton maxi dress for modern women.",
    fabric: "Cotton",
    care: "Machine Wash",
    shipping: "12-15 Days",
    details: {
      kurta: [
        "Fabric - Cotton",
        "Length - 52 inch",
        "Round Neck",
        "Sleeveless design"
      ]
    }
  },
  {
    id: "7tvi20",
    name: "Anarkali",
    price: 99,
    originalPrice: 275,
    discount: 33,
    rating: 4.4,
    reviews: 6744,
    image: Anarkali,
    images: [Anarkali, Anarkali2, Anarkali3, Anarkali4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Beautiful blue Anarkali dress with swan embroidery.",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Dyed/ Washed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "4k816k",
    name: "Flared Purple Kurti",
    price: 99,
    originalPrice: 250,
    discount: 33,
    rating: 4.0,
    reviews: 2850,
    image: k816k_1,
    images: [k816k_1, k816k_2, k816k_3, k816k_4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL" ,"XXXL"],
    description: "Beyond Fashion Women's Solid Printed Round Pleated Flared Kurti (Purple)",
    fabric: "Rayon",
    care: "Hand Wash Machine Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Solid", 
        "Combo of : Single",
        "Fit Type : Regular",
        "Ocassion : Casual, Formal, Casual, Daily",
        "Packet contains : 1 readymade Kurti."
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "2h7w1v",
    name: "women kurta",
    price: 99,
    originalPrice: 264,
    discount: 33,
    rating: 3.9,
    reviews: 669,
    image: h7w1v_1,
    images: [h7w1v_1, h7w1v_2, h7w1v_3, h7w1v_4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Trendy Fabulous Kurtis ",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
        "Fit Type : Regular",
        "Ocassion : Casual, Formal, Casual, Daily",
        "Packet contains : 1 readymade Kurti."
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "63cbki",
    name: "Aishani Fabulous Kurtis",
    price: 99,
    originalPrice: 258,
    discount: 33,
    rating: 3.9,
    reviews: 1200,
    image: cbki1,
    images: [cbki1, cbki2, cbki3, cbki4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Trendy Fabulous Kurtis ",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
        "Fit Type : Regular",
        "Ocassion : Casual, Formal, Casual, Daily",
        "Packet contains : 1 readymade Kurti."
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "77frcm",
    name: "Charvi Fashionable Kurtis",
    price: 99,
    originalPrice: 259,
    discount: 33,
    rating: 3.4,
    reviews: 9490,
    image: frcm1,
    images: [frcm1, frcm2, frcm3, frcm4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Kurtis for women -2024 Collection",
    fabric: "Satin",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Satin",
        "Anarkali Style full flare",
        "Round Neck",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length - Short Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "4mg7nd",
    name: "Polyster/Crepe fabric-jivika superior Kurti",
    price: 99,
    originalPrice: 290,
    discount: 33,
    rating: 3.8,
    reviews: 1757,
    image: mg7nd1,
    images: [mg7nd1, mg7nd2, mg7nd3, mg7nd4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "kurti palazzo set chikankari kurti kurti set short kurti",
    fabric: "Crepe",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Crepe",
        "Anarkali Style full flare",
        "Round Neck",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Checked", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "5jtmad",
    name: "Anarkali High Demand trendy Rayon Gown Kurtis",
    price: 99,
    originalPrice: 240,
    discount: 33,
    rating: 3.8,
    reviews: 7751,
    image: jtmad1,
    images: [jtmad1, jtmad2, jtmad3, jtmad4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "women, men and children. Customers can expect a world-class shopping environment stocking the latest in international fashion from around the globe, as well as DDG's own label of in-house designs in carefully chosen color palettes.",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Solid", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "sjykz1",
    name: "ryon kurtis",
    price: 99,
    originalPrice: 249,
    discount: 33,
    rating: 4.0,
    reviews: 4000,
    image: sjykz1,
    images: [sjykz1, sjykz2, sjykz3, sjykz4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "women, men and children. Customers can expect a world-class shopping environment stocking the latest in international fashion from around the globe, as well as DDG's own label of in-house designs in carefully chosen color palettes.",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Long Sleeves",
        "Pattern- Chikankari", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "8wkcil",
    name: "Women's rayon printed short kurti",
    price: 99,
    originalPrice: 277,
    discount: 4,
    rating: 4.1,
    reviews: 4336,
    image: wkcil1,
    images: [wkcil1, wkcil2, wkcil3, wkcil4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "kurti palazzo set chikankari kurti kurti set short kurti",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length - Long Sleeves",
        "Pattern- Checked", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "6d7i3r",
    name: "SAHJANAND FASHIONABLE KURTIS",
    price: 99,
    originalPrice: 277,
    discount: 4,
    rating: 4.1,
    reviews: 1340,
    image: d7i3r1,
    images: [d7i3r1, d7i3r2, d7i3r3, d7i3r4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "kurti palazzo set chikankari kurti kurti set short kurti",
    fabric: "Georgette",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Georgette",
        "Anarkali Style full flare",
        "Round Neck",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Chikankari", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "55tdmh",
    name: "Women Rayon Printed Aaradhya Anarkali Kurtis",
    price: 99,
    originalPrice: 295,
    discount: 4,
    rating: 4.0,
    reviews: 10225,
    image: tdmh1,
    images: [tdmh1, tdmh2, tdmh3, tdmh4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Buy Kurtas for Women Online at Best Price on Meesho",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Chikankari", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "5tylxj",
    name: "Anarkali Gown embroidry",
    price: 99,
    originalPrice: 300,
    discount: 4,
    rating: 3.9,
    reviews: 3213,
    image: tylxj1,
    images: [tylxj1, tylxj2, tylxj3, tylxj4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Buy Kurtas for Women Online at Best Price on Meesho",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Solid", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "9ojpif",
    name: "Women's Latest Floral Printed Kurta new collection",
    price: 99,
    originalPrice: 300,
    discount: 33,
    rating: 3.9,
    reviews: 3213,
    image: ojpif,
    images: [],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Buy Kurtas for Women Online at Best Price on Meesho",
    fabric: "Cotton",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Cotton",
        " Women's Latest Floral Printed Kurta new collection",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "65eqip",
    name: "Kurtis For Woman",
    price: 99,
    originalPrice: 300,
    discount: 33,
    rating: 4.2,
    reviews: 7001,
    image: eqip1,
    images: [eqip1, eqip2, eqip3, eqip4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Buy Kurtas for Women Online at Best Price on Meesho",
    fabric: "Net",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Net",
        " Women's Latest Floral Printed Kurta new collection",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Three-Quarter Sleeves",
        "Pattern- Solid", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "86fg5c",
    name: "Women's Trending Rayon Printed Black Short Kurti",
    price: 99,
    originalPrice: 300,
    discount: 33,
    rating: 4.2,
    reviews: 22711,
    image: fg5c1,
    images: [fg5c1, fg5c2, fg5c3, fg5c4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Buy Kurtas for Women Online at Best Price on Meesho",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        " Women's Latest Floral Printed Kurta new collection",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Three-Quarter Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "bsk3i",
    name: "Rayon printed Anarkali Sleevless Long Kurti cum Gown",
    price: 99,
    originalPrice: 300,
    discount: 33,
    rating: 4.2,
    reviews: 16900,
    image: bsk3i1,
    images: [bsk3i1, bsk3i2, bsk3i3, bsk3i4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Buta Flower Rayon Printed Short Kurta Casual Short Kurti For Women",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        " Women's Latest Floral Printed Kurta new collection",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Three-Quarter Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "9l71dg",
    name: "Rayon printed Anarkali Sleevless Long Kurti cum GowButa Flower Rayon Printed Short Kurtan",
    price: 99,
    originalPrice: 600,
    discount: 66,
    rating: 4.4,
    reviews: 16900,
    image: l71dg1,
    images: [l71dg1, l71dg2, l71dg3, l71dg4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "women gown ,women trending gown, peach gown, trending gown, anarkali gown, Elegant gown, Feminine gown, Graceful gown",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        " Women's Latest Floral Printed Kurta new collection",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Three-Quarter Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "7a65a6",
    name: "Women Trending Rayon Printed Short Kurta",
    price: 99,
    originalPrice: 600,
    discount: 66,
    rating: 4.2,
    reviews: 6299,
    image: a65a61,
    images: [a65a61, a65a62, a65a63, a65a64],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "women gown ,women trending gown, peach gown, trending gown, anarkali gown, Elegant gown, Feminine gown, Graceful gown",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        " Women's Latest Floral Printed Kurta new collection",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Three-Quarter Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "7uot64",
    name: "V-Neack short Cotton kurti for women",
    price: 99,
    originalPrice: 600,
    discount: 66,
    rating: 4.0,
    reviews: 13099,
    image: uot641,
    images: [uot641, uot642, uot643, uot644],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "V-Neack short Cotton kurti for women.",
    fabric: "Cotton",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Cotton",
        " Women's Latest Floral Printed Kurta new collection",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Three-Quarter Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "4z49pf",
    name: "anarakali kurti and dupatta pink",
    price: 99,
    originalPrice: 600,
    discount: 66,
    rating: 4.0,
    reviews: 1711,
    image: z49pf1,
    images: [z49pf1, z49pf2, z49pf3, z49pf4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Chitrarekha Attractive Women KurtI DUPATTA.",
    fabric: "Cotton",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Cotton",
        " Women's Latest Floral Printed Kurta new collection",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Three-Quarter Sleeves",
        "Set Type : KurtI With Dupatta",
        "Pattern- Printed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "8mpzxj",
    name: "KVS TOP BLACK",
    price: 99,
    originalPrice: 600,
    discount: 66,
    rating: 4.0,
    reviews: 1711,
    image: mpzxj1,
    images: [mpzxj1, mpzxj2, mpzxj3, mpzxj4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Chitrarekha Attractive Women KurtI DUPATTA.",
    fabric: "Cotton",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Cotton",
        " Women's Latest Floral Printed Kurta new collection",
        "weight - 300 gm",  
        "Length - 50 inch",
        "Sleeve Length -  Three-Quarter Sleeves",
        "Set Type : KurtI With Dupatta",
        "Pattern- Printed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },



// Saries
  {
    id: "88bqyk",
    name: "cotton silk jacquard saree with unstitched blouse",
    price: 199,
    originalPrice: 600,
    discount: 66,
    rating: 4.4,
    reviews: 3495,
    image: bqyk_1,
    images: [bqyk_1,bqyk_2,bqyk_3,bqyk_4],
    category: "combo3",
    sizes: ["Free Size"],
    description: "Chitrarekha Attractive Women KurtI DUPATTA.",
    fabric: "Cotton Silk",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      ProductDetails: [
        "Saree Fabric - Cotton Silk",
        "Blouse - Running Blouse",
        "Blouse Fabric - Cotton Silk",  
        "Pattern - Zari Woven",
        "Blouse Pattern - Same as Border",
        "Net Quantity (N) - Single",
        "Material - Premium-quality silk with a smooth, lustrous texture.", 
        "Design - Elegant cream body adorned with intricate maroon woven patterns.",
        "Blouse Piece - Comes with a matching blouse piece to complete the ensemble.",
        "Occasion - Ideal for weddings, festive celebrations, and traditional events.",
        "Style - A timeless design that blends cultural heritage with modern sophistication.",
        "Comfort - Lightweight and easy to drape, ensuring all-day comfort.",
        "Sizes  - Free Size (Saree Length Size : 6.1 m, Blouse Length Size: 0.9 m)"
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "11bhz0",
    name: "EROAD SILK",
    price: 199,
    originalPrice: 600,
    discount: 66,
    rating: 4.0,
    reviews: 3495,
    image: bhz0_1,
    images: [bhz0_1,bhz0_2,bhz0_3,bhz0_4],
    category: "combo3",
    sizes: ["Free Size"],
    description: "Chitrarekha Attractive Women KurtI DUPATTA.",
    fabric: "Cotton Silk",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      ProductDetails: [
        "Saree Fabric - Cotton Silk",
        "Blouse - Running Blouse",
        "Blouse Fabric - Cotton Silk",  
        "Pattern - Zari Woven",
        "Blouse Pattern - Embellished",
        "Net Quantity (N) - Single",
        "Saree - Eroad silk Blouse - Banglori Silk",
        "Sizes  - Free Size (Saree Length Size : 6.1 m, Blouse Length Size: 0.9 m)"
      ],
      pants: [],
      dupatta: []
    }
  },
  {
  "id": "82glm0",
  "name": "New Design Saree",
  "price": 99,
  "originalPrice": 799,
  "discount": 69,
  "rating": 4.2,
  "reviews": 1825,
  "image": glm0_1,
  "images": [glm0_1, glm0_2, glm0_3, glm0_4],
  "category": "combo3",
  "sizes": ["Free Size"],
  "description": "Elegant New Design Saree crafted in chiffon with zari pattern and matching blouse piece.",
  "fabric": "Chiffon",
  "care": "Dry Clean Only",
  "shipping": "5-7 Days",
  "details": {
    "ProductDetails": [
      "Saree Fabric - Chiffon",
      "Blouse - Running Blouse",
      "Blouse Fabric - Chiffon",
      "Pattern - Zari Woven",
      "Blouse Pattern - Embellished",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.3 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    "pants": [],
    "dupatta": []
  }
  },
  
  {
  id: "7x0pi5",
  name: "Brassa Net Saree",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.1,
  reviews: 1560,
  image: x0pi5,
  images: [x0pi5],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Stylish Brassa Net Saree with a lightweight drape and matching blouse piece.",
  fabric: "Net",
  care: "Hand Wash",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Net",
      "Blouse - Running Blouse",
      "Blouse Fabric - Net",
      "Pattern - Embroidered",
      "Blouse Pattern - Designer",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "6svggo",
  name: "Chiffon Flower Saree With Pipping",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.2,
  reviews: 1740,
  image: svggo_1,
  images: [svggo_1, svggo_2, svggo_3, svggo_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Beautiful Chiffon Flower Saree with elegant piping design and matching blouse piece.",
  fabric: "Chiffon",
  care: "Hand Wash",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Chiffon",
      "Blouse - Running Blouse",
      "Blouse Fabric - Chiffon",
      "Pattern - Printed",
      "Blouse Pattern - Solid",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "67fp46",
  name: "Best Silk Printed Daily Wear Saree",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.0,
  reviews: 1395,
  image: fp46_1,
  images: [fp46_1, fp46_2, fp46_3, fp46_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Lightweight and stylish silk-printed saree, perfect for daily wear with a matching blouse piece.",
  fabric: "Chiffon",
  care: "Hand Wash",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Chiffon",
      "Blouse - Running Blouse",
      "Blouse Fabric - Chiffon",
      "Pattern - Printed",
      "Blouse Pattern - Solid",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "7k8c84",
  name: "Women's Georgette Saree with Embroidered Blouse Piece",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.3,
  reviews: 2015,
  image: k8c84_1,
  images: [k8c84_1, k8c84_2, k8c84_3, k8c84_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Elegant women's georgette saree paired with a beautifully embroidered blouse piece, perfect for festive and casual occasions.",
  fabric: "Georgette",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Georgette",
      "Blouse - Running Blouse",
      "Blouse Fabric - Georgette",
      "Pattern - Embroidered",
      "Blouse Pattern - Embroidered",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  
  {
  id: "lxnug",
  name: "Silk White Saree With Blouse",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.1,
  reviews: 1520,
  image: lxnug_1,
  images: [lxnug_1, lxnug_2, lxnug_3, lxnug_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Classic white silk saree crafted from khadi silk, paired with a separate blouse piece for an elegant traditional look.",
  fabric: "Khadi Silk",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Khadi Silk",
      "Blouse - Separate Blouse Piece",
      "Blouse Fabric - Silk",
      "Pattern - Printed",
      "Blouse Pattern - Solid",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "7ky2ve",
  name: "Banarasi Silk Saree New Collection 2024 Party Wear",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.3,
  reviews: 1965,
  image: ky2ve_1,
  images: [ky2ve_1, ky2ve_2, ky2ve_3, ky2ve_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Exclusive Banarasi silk saree from the 2024 new collection, designed for party wear with elegant woven detailing.",
  fabric: "Banarasi Silk",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Banarasi Silk",
      "Blouse - Running Blouse",
      "Blouse Fabric - Silk",
      "Pattern - Woven Design",
      "Blouse Pattern - Embellished",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "8md",
  name: "Saree for Special Occasions",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.2,
  reviews: 1725,
  image: md_1,
  images: [md_1, md_2, md_3, md_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Elegant ethnic saree designed for special occasions, paired with a matching blouse piece.",
  fabric: "Ethnic Net",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Net",
      "Blouse - Running Blouse",
      "Blouse Fabric - Net",
      "Pattern - Ethnic Design",
      "Blouse Pattern - Solid",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.6 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "2m7bhh",
  name: "Aagæn Drishya Saree",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.0,
  reviews: 1485,
  image: m7bhh_1,
  images: [m7bhh_1, m7bhh_2, m7bhh_3, m7bhh_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Beautiful ethnic net saree from Aagæn Drishya collection, designed with lightweight fabric and elegant style.",
  fabric: "Net",
  care: "Hand Wash",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Net",
      "Blouse - Running Blouse",
      "Blouse Fabric - Net",
      "Pattern - Solid",
      "Blouse Pattern - Designer",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "6xx48r",
  name: "Beautiful Designer Georgette Laced Saree with Blouse",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.3,
  reviews: 2125,
  image: xx48r_1,
  images: [xx48r_1, xx48r_2, xx48r_3, xx48r_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Beautiful designer georgette laced saree with matching blouse piece, perfect for daily wear, festive events, weddings, parties, and special occasions.",
  fabric: "Georgette",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Georgette",
      "Blouse - Running Blouse",
      "Blouse Fabric - Georgette",
      "Pattern - Printed",
      "Blouse Pattern - Embroidered",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.3 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "915qyv",
  name: "World Wine Georgette Saree with Multiple Blouse Options",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.2,
  reviews: 1870,
  image: qyv_1,
  images: [qyv_1, qyv_2, qyv_3, qyv_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Stylish World Wine georgette saree with embroidered detailing and multiple blouse options, perfect for festive and semi-formal occasions.",
  fabric: "Georgette",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Georgette",
      "Blouse - Multiple Blouse Options",
      "Blouse Fabric - Georgette",
      "Pattern - Embroidered",
      "Blouse Pattern - Embroidered",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "3heef0",
  name: "Black White Lycra Blend Zebra Patta Party Wear Saree",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.3,
  reviews: 1985,
  image: heef0_1,
  images: [heef0_1, heef0_2, heef0_3, heef0_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Trendy black and white Lycra blend saree with zebra patta striped design, paired with an art silk blouse piece. Perfect for parties and evening occasions.",
  fabric: "Lycra Blend",
  care: "Hand Wash",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Lycra Blend",
      "Blouse - Separate Blouse Piece",
      "Blouse Fabric - Art Silk",
      "Pattern - Striped",
      "Blouse Pattern - Solid",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "52gvcg",
  name: "Aakarsha Drishya Saree",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.1,
  reviews: 1580,
  image: gvcg_1,
  images: [gvcg_1, gvcg_2, gvcg_3, gvcg_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Elegant Aakarsha Drishya saree crafted in art silk, paired with a matching running blouse piece for a graceful look.",
  fabric: "Art Silk",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Art Silk",
      "Blouse - Running Blouse",
      "Blouse Fabric - Art Silk",
      "Pattern - Solid",
      "Blouse Pattern - Designer",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.3 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "8vuqma",
  name: "Jimmy Choo Organza Saree with Embroidered Border and Sequin Work",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.4,
  reviews: 1860,
  image: vuqma_1,
  images: [vuqma_1, vuqma_2, vuqma_3, vuqma_4],
  category:"combo3",
  sizes: ["Free Size"],
  description: "Luxurious Jimmy Choo Organza saree with embroidered border and elegant sequin work, paired with a satin silk blouse piece. Perfect for festive, wedding, and party occasions.",
  fabric: "Organza",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Organza",
      "Blouse - Running Blouse",
      "Blouse Fabric - Satin Silk",
      "Pattern - Embroidered & Solid",
      "Border - Sequin Work",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.3 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "7svux5",
  name: "Traditional Warli Art Printed Georgette Saree",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.3,
  reviews: 1745,
  image: svux5_1,
  images: [svux5_1, svux5_2, svux5_3, svux5_4],
  category: "combo3",
  sizes: ["Free Size"],
  description: "Elegant Warli art printed Georgette saree featuring intricate tribal motifs inspired by traditional village life. Accented with vibrant colors and a pom-pom border, this lightweight saree is perfect for festive and cultural occasions.",
  fabric: "Georgette",
  care: "Hand Wash",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Georgette",
      "Blouse - Separate Piece",
      "Blouse Fabric - Georgette",
      "Pattern - Printed",
      "Border - Pom-Pom Detailing",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "7s0zru",
  name: "Bandhani Georgette Saree with Lace Border",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.2,
  reviews: 1610,
  image: s0zru_1,
  images: [s0zru_1, s0zru_2, s0zru_3, s0zru_4],
  category: "combo3",
  sizes: ["Free Size"],
  description: "Beautiful Bandhani georgette saree in yellow and red tones, featuring a delicate lace border. Comes with a separate georgette blouse piece, perfect for festive and casual occasions.",
  fabric: "Georgette",
  care: "Hand Wash",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Georgette",
      "Blouse - Separate Piece",
      "Blouse Fabric - Georgette",
      "Pattern - Printed",
      "Blouse Pattern - Border",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "5dk1it",
  name: "Heavy Silver Embroidery Saree with Full Stone Work",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.4,
  reviews: 1920,
  image: dk1it_1,
  images: [dk1it_1, dk1it_2, dk1it_3, dk1it_4],
  category: "combo3",
  sizes: ["Free Size"],
  description: "Stunning georgette saree with heavy silver embroidery and full stone work, paired with a matching blouse. Perfect for weddings, parties, and festive occasions.",
  fabric: "Georgette",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Georgette",
      "Blouse - Multiple Blouse Options",
      "Blouse Fabric - Georgette",
      "Pattern - Embroidered",
      "Blouse Pattern - Embellished",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "5rx562",
  name: "Shimmer Saree with Mirror Work and Chemical Lace with Diamond Handwork",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.3,
  reviews: 1845,
  image: rx562_1,
  images: [rx562_1, rx562_2, rx562_3, rx562_4],
  category: "combo3",
  sizes: ["Free Size"],
  description: "Contemporary shimmer saree featuring mirror work, chemical lace, and diamond handwork. Adorned with timeless floral motifs, perfect for weddings, parties, and festive occasions.",
  fabric: "Blend",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Blend",
      "Blouse - Running Blouse",
      "Blouse Fabric - Lycra",
      "Pattern - Embellished",
      "Blouse Pattern - Border",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "8kdjln",
  name: "Dark Wine Saree Solo Pattern Jalar Chati Embellished with Embroidered Blouse",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.4,
  reviews: 1995,
  image: kdjln_1,
  images: [kdjln_1, kdjln_2, kdjln_3, kdjln_4],
  category: "combo3",
  sizes: ["Free Size"],
  description: "Elegant dark wine chiffon saree with solo pattern jalar chati design, paired with an embroidered blouse. Perfect for festive occasions, parties, and weddings.",
  fabric: "Chiffon",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Chiffon",
      "Blouse - Separate Piece",
      "Blouse Fabric - Chiffon",
      "Pattern - Embellished",
      "Blouse Pattern - Embroidered",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.5 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },
  {
  id: "7q25ko",
  name: "ALIYAH Fancy Red Organza Silk Saree",
  price: 99,
  originalPrice: 291,
  discount: 66,
  rating: 4.3,
  reviews: 1720,
  image: q25ko_1,
  images: [q25ko_1, q25ko_2, q25ko_3, q25ko_4],
  category: "combo3",
  sizes: ["Free Size"],
  description: "Premium quality ALIYAH fancy red organza silk saree with elegant border detailing and matching running blouse piece, perfect for festive and special occasions.",
  fabric: "Organza Silk",
  care: "Dry Clean Only",
  shipping: "5-7 Days",
  details: {
    ProductDetails: [
      "Saree Fabric - Organza Silk",
      "Blouse - Running Blouse",
      "Blouse Fabric - Organza",
      "Pattern - Embellished",
      "Blouse Pattern - Border",
      "Net Quantity (N) - Single",
      "Saree Length Size - 5.8 m",
      "Blouse Length Size - 0.8 m",
      "Country of Origin - India"
    ],
    pants: [],
    dupatta: []
  }
  },



























  
  // AUTO-APPENDED GENERATED SHIRTS
  ...generatedShirts
];

// Categories
export const categories = [
  {
    id: 'all',
    name: 'Categories',
    icon: 'Grid3X3',
    bgColor: 'bg-fashion-pink/10',
    iconColor: 'text-fashion-pink',
    image: '/cat-all.svg'
  },
  {
    id: 'kurtis',
    name: 'Western Dresses',
    icon: 'Shirt',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
    image: '/cat-kurtis.webp'
  },
  {
    id: 'combo2',
    name: 'Menswear',
    icon: 'Layers',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500',
    image: '/cat-combo.webp'
  },
  {
    id: 'combo3',
    name: 'Ethnic Wear',
    icon: 'Package',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
    image: '/cat-sarees.webp'
  }
];
