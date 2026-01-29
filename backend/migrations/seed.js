import supabase from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';

// 产品数据，从前端constants.tsx复制
const PRODUCTS = [
  {
    id: '1',
    name: '中央实验台 XL-201',
    sku: '#2024-B01',
    description: '采用12.7mm厚实芯理化板，具有卓越的耐酸碱与抗冲击性能。全钢模块化结构，专为高强度科研环境打造。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2ccN23MDb-JT3H20q07_OIQ9e5S8sigHL1T6-5rojzADJMKGQs-UTgljrUKsWhCt6oAJUOuzt1Cq3JcG0oPFNreUlJYMQhrYBOdXyFocbiBW8UgZ0FotBhTRfJ2S-b5CqyeNOVethndF7XMVBOsNgvkeuB5tJ6nb7CtyaAc7oaNBLY0eJNZZTGKIX_0teLtuaFFrtbRLYYp1EhamomMA6OQp4zGXzNbPa0_vlJmnVy1YvhlF-YXckzcSTH0ZbbHrzE2nLWeN7ZIw',
    tags: ['实芯理化板', '全钢模块'],
    category: '全钢实验台',
    badge: '主推产品',
    badgeColor: 'bg-primary-500'
  },
  {
    id: '2',
    name: '全钢通风柜 VH-1200',
    sku: '#2024-S02',
    description: '高效排风系统设计，配备工业级防爆视窗与智能触控面板。多重安全检测报警系统。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAOuBvCbtdtQoQ3yZAd2ivrJL1I9rBiKB37ZJk7sXDTSzVAbay2_BVOXBG_cVHWNsaGQCcmZqzhDjw1vjw5XI0R64v8aGYnqq9tt0nMHFgoV75kdUF0zMAK-xMWHANL-vAZ8z42P7byk8x1OUjMexOWRZ5w5Mq5CXhRfgZadkDRg-6JQQw64hVqSU33fxL3zidb4UD6ks-LNxrMoP3w8xFSbRgNcwPsdpNliR9_h3HZzpcfnqbSlQfddGvusRhtLpYc406iM3HTM8',
    tags: ['PP防腐内衬', '智能控风'],
    category: '通风柜系统',
    badge: '安全加强',
    badgeColor: 'bg-slate-900'
  },
  {
    id: '3',
    name: '减震天平台 XL-50',
    sku: '#2024-T03',
    description: '专为万分级天平设计，采用大理石台面及独立避震结构。有效排除外部细微振动干扰。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjZ9bOENXwzfFBFsnRHQJ_SMAjye3yOAkpEXCE8l9dYhf3vCv5S2G70WqsXbSPCbGdrfcBgLUjnRXpsiPuRm3NF0kBCUYnfMDidCtbMmNdDsfs5mpeLbNLRZUSim5n_6XrP_7UevPafZzxNqwQ4x8Xk5ZFCnYTr3ZCcoAftAOdOH7ImyHEaujtklmk7IRVkYhkEvnHyNZiXBjkL-by0GDN03J6TvkpzrQoADitrez8O3SMDzTP9BrwlNq8k1UocFRtPqd2ne_3xxs',
    tags: ['大理石面', '万分级避震'],
    category: '配套设施'
  },
  {
    id: '4',
    name: '试剂药品柜 SC-800',
    sku: '#2024-R04',
    description: '分类存储管理系统，配备主动排风接口。全钢柜体经环氧树脂粉末喷涂处理，极度耐腐。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVkx5FziB7uUlHfTaENbQtpbqPtI2YVur0p1SRajwWzYnwDjvNf7QPILvtAIbF8qqoTQeiZ_0RDLajWXXCka_xJj0-TGNS39jq7AuUcM6-qnaYNYiRO_W7ImEC6svrGisB6d4yrMUv6bGToXKrqEs1O4Ndsu37lrops427qD4h0FO0pCnPCIymnIXShfkOFWorEIm7-uj1T26N0vTQoubAnKwIApxMlAE3lrj3TDp37USbUQKYe7ylz--XEatch5D7hcWl_ds4DCU',
    tags: ['耐强酸碱', '排风接口'],
    category: '药品存储柜'
  },
  {
    id: '5',
    name: '防爆气瓶柜 GC-100',
    sku: '#2024-G05',
    description: '集成自动气体侦测报警系统与排风系统。符合OSHA及各级实验室安全操作规范。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhsBOZsAtE85IeA7HiaMDbTCjJvIlq0KPio1Ph5_C5GA912D6acblsnkCO0c3RAK7-NpG5P2oO7zAJef0sm-rVJK9irRC9fXHBuVY5uuMiQ-Xxzbjud5ESqRkzWlTixYX6iSOYypCXtDL1grz-ud7rU4v1sded4rDJ3gr4jr3LqXQX_u3wI_Jahw0hirNJXbIxoTmJWeGsNHA8bIFFAronQCTz9HsT0C8lN30p4705_0MCEOQZQsmuqisM7WiOWZDlFmY3Z1OJY8',
    tags: ['气体监控', '防爆标准'],
    category: '药品存储柜'
  },
  {
    id: '6',
    name: '钢木边台 XL-305',
    sku: '#2024-W06',
    description: '高性价比钢木结构，台面可选配环氧树脂板或理化板。适合日常操作与常规检测使用。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5VOjBpaDxiNhlbhP142S8Kfs-viDO7-fUIvfFH4wIiXyb7bc7Y9zG085ShNH-PryP09SQNVHsnqzs_z-tWMmiZghcZYxwlg0AvLIuWsOe7v6_nZwQUoCZvw1Ml2f_Slhm0xlL4IMB7iH7EPJ1aok0hU-3ziNje7wCZyYeY5g45ni1Ea99ForfscRjRjw4DWxsGgt0bPSUWUo-_pZMYHTDxkqcAPDNSkOu-A3hXlrnhWNAd3TYYyT-7C1PLOTi5VKfyrvrO4dnCmM',
    tags: ['经济型', '灵活组合'],
    category: '全钢实验台'
  }
];

// 初始化数据
async function seedData() {
  try {
    // 提取所有分类
    const categories = [...new Set(PRODUCTS.map(product => product.category))];

    // 插入分类数据
    for (const categoryName of categories) {
      const { data: existingCategory } = await supabase
        .from('categories')
        .select('id')
        .eq('name', categoryName)
        .single();

      if (!existingCategory) {
        const { error } = await supabase
          .from('categories')
          .insert({
            id: uuidv4(),
            name: categoryName
          });

        if (error) {
          console.error('Error inserting category:', error);
        }
      }
    }

    // 插入产品数据
    for (const product of PRODUCTS) {
      const { data: existingProduct } = await supabase
        .from('products')
        .select('id')
        .eq('sku', product.sku)
        .single();

      if (!existingProduct) {
        const { error } = await supabase
          .from('products')
          .insert({
            id: product.id,
            name: product.name,
            sku: product.sku,
            description: product.description,
            image: product.image,
            category: product.category,
            badge: product.badge,
            badge_color: product.badgeColor
          });

        if (error) {
          console.error('Error inserting product:', error);
          continue;
        }

        // 插入标签数据
        for (const tagName of product.tags) {
          const { data: existingTag } = await supabase
            .from('tags')
            .select('id')
            .eq('name', tagName)
            .single();

          let tagId;

          if (existingTag) {
            tagId = existingTag.id;
          } else {
            const { data: newTag, error } = await supabase
              .from('tags')
              .insert({
                id: uuidv4(),
                name: tagName
              })
              .select('id')
              .single();

            if (error) {
              console.error('Error inserting tag:', error);
              continue;
            }

            tagId = newTag.id;
          }

          // 插入产品标签关联
          const { error } = await supabase
            .from('product_tags')
            .insert({
              product_id: product.id,
              tag_id: tagId
            });

          if (error) {
            console.error('Error inserting product_tag:', error);
          }
        }
      }
    }

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// 运行数据初始化
seedData();