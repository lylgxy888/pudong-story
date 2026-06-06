import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ---------- 1. 滚动监听：导航栏高亮切换 ---------- */
const sections = document.querySelectorAll('.story-section');
const navItems = document.querySelectorAll('.nav-item');

sections.forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 120px',
    end: 'bottom 120px',
    onToggle: (self) => {
      if (self.isActive) {
        const id = section.id;
        navItems.forEach((item) => {
          if (item.dataset.target === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    }
  });
});

// 点击导航栏平滑滚动跳转
navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const targetId = item.dataset.target;
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});

/* ---------- 2. 交互：等腰三角形悬停提示 ---------- */
const hotspots = document.querySelectorAll('.map-hotspot');
const tooltip = document.getElementById('map-tooltip');

hotspots.forEach(spot => {
  spot.addEventListener('mouseenter', (e) => {
    tooltip.innerText = e.target.dataset.info;
    tooltip.style.color = '#ff9d24';
  });
  spot.addEventListener('mouseleave', () => {
    tooltip.innerText = "指向地图上的关键节点查看详情";
    tooltip.style.color = '#ff981a';
  });
});

/* ---------- 3. 交互：五国方案 SVG 变形 ---------- */
const morphShape = document.getElementById('morph-shape');
const schemeTitle = document.getElementById('scheme-title');
const tabBtns = document.querySelectorAll('.tab-btn');

const shapes = {
  japan:  '200,80 340,170 320,330 80,330 60,170',
  italy:  '200,80 360,120 360,300 200,360 40,300',
  france: '200,80 360,80 360,330 200,330 200,200',
  uk:     '200,200 360,200 360,330 200,330 40,330',
  china:  '200,80 280,80 280,180 360,180 360,330 40,330'
};

const titles = {
  japan:  '日本方案：集成电路板超现实系统',
  italy:  '意大利方案：太极八卦古堡（东方文化融入）',
  france: '法国方案：现代抽象，与外滩古典精致对比',
  uk:     '英国方案：罗马角斗场，中间是大面积绿地',
  china:  '中国方案：东西向轴线，注重实用与辐射力'
};

tabBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    tabBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const scheme = e.target.dataset.scheme;
    gsap.to(morphShape, {
      attr: { points: shapes[scheme] },
      duration: 0.5,
      ease: 'power2.out'
    });
    schemeTitle.innerText = titles[scheme];
  });
});

/* ---------- 4. 交互：四大开发模式抉择 ---------- */
const modelBtns = document.querySelectorAll('.model-btn');
const evalName = document.getElementById('eval-name');
const evalDesc = document.getElementById('eval-desc');

const modelEvals = {
  tech: {
    name: "经济技术开发区模式（工业小区）",
    desc: "20世纪80年代各地常用。成功率高，但功能单一，经济规模小，不具备城市经济的集聚与辐射功能，与浦东开发的目标不相符合。"
  },
  sez: {
    name: "经济特区模式",
    desc: "规模大，但特区模式在当时必须以浦东浦西分隔为前提（拉铁丝网），无法达到“东西联动”、重构上海全国经济中心的目标。"
  },
  hk: {
    name: "“再造香港”模式",
    desc: "具有强大的第三产业和经济中心功能，但香港产业结构高度“空心化”，且属于完全自由市场体制，浦东可借鉴但不能照搬。"
  },
  sg: {
    name: "“全方位、多层次开发的新区方式”（最终选择）",
    desc: "设立陆家嘴金融、外高桥保税、金桥加工、张江高科等功能区，金融先行，东西联动。既发挥上海工业和科技优势，又实现对全国的强力辐射。"
  }
};

modelBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    modelBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const model = e.target.dataset.model;
    evalName.innerText = modelEvals[model].name;
    evalDesc.innerText = modelEvals[model].desc;
  });
});

/* ---------- 5. 交互：四大功能区卡片 ---------- */
const zoneCards = document.querySelectorAll('.zone-card');
const zoneDetail = document.getElementById('zone-detail-display');

const zoneDetails = {
  lujiazui: "💡 陆家嘴金融区思路：与外滩一江之隔，发展金融、信息，使城市资金盘活。充分发挥黄金地段的级差效应，产生最大效益。",
  waigaoqiao: "💡 外高桥保税区思路：商品进入该区“境内关外”免税保税。朱镕基当时用英文向外商直译为“Free Trade Zone”（自由贸易区），极具超前眼光。",
  jinqiao: "💡 金桥出口加工区思路：江泽民和朱镕基要求浦东发展“现代、资金密集、技术密集、创汇强”的工业。金桥重点引入汽车、电子等支柱产业，优化中国产业结构。",
  zhangjiang: "💡 张江高科技园区思路：上海的改造和振兴不仅要靠传统工业，更要靠自主创新。张江配备了大学、研究所、“孵化器”和风险投资，打造中国的硅谷。"
};

zoneCards.forEach(card => {
  card.addEventListener('click', () => {
    const zone = card.dataset.zone;
    zoneDetail.innerText = zoneDetails[zone];
    gsap.fromTo(zoneDetail, { opacity: 0.5, y: 5 }, { opacity: 1, y: 0, duration: 0.3 });
  });
});

/* ---------- 6. 交互：法律盖章 ---------- */
const lawStack = document.getElementById('law-stack');
const lawSeal = document.getElementById('law-seal');

lawStack.addEventListener('click', () => {
  lawSeal.classList.add('stamped');
  gsap.fromTo(lawStack, { y: -2 }, { y: 0, duration: 0.1, repeat: 3 });
});

/* ---------- 7. 交互：敲锣与声波 ---------- */
const gongWrapper = document.getElementById('gong-wrapper');
const playGongBtn = document.getElementById('play-gong-btn');
const gongWave = document.getElementById('gong-wave');

function playGong() {
  gsap.fromTo(gongWrapper, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
  
  // 扩散波纹动画
  gongWave.classList.remove('active');
  void gongWave.offsetWidth; // 强制重绘
  gongWave.classList.add('active');

  // 原生合成锣声
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 1.5);
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 1.5);
}

playGongBtn.addEventListener('click', playGong);
gongWrapper.addEventListener('click', playGong);

/* ---------- 8. 动画：复刻图像中的柱状图动效 ---------- */
const segments = document.querySelectorAll('.segment');

ScrollTrigger.create({
  trigger: '.chart-container',
  start: 'top 80%',
  onEnter: () => {
    segments.forEach(seg => {
      const targetHeight = seg.style.height;
      gsap.fromTo(seg, 
        { height: '0%' }, 
        { height: targetHeight, duration: 1.2, ease: 'power2.out' }
      );
    });
  }
});
