import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase;

// 尝试创建Supabase客户端
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Error creating Supabase client:', error);
  // 继续使用模拟实现
  supabase = createMockSupabase();
}

// 模拟Supabase客户端
function createMockSupabase() {
  console.log('Using mock Supabase implementation');
  
  // 模拟数据
  const mockProducts = [
    {
      id: '1',
      name: '中央实验台 XL-201',
      sku: '#2024-B01',
      description: '采用12.7mm厚实芯理化板，具有卓越的耐酸碱与抗冲击性能。全钢模块化结构，专为高强度科研环境打造。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2ccN23MDb-JT3H20q07_OIQ9e5S8sigHL1T6-5rojzADJMKGQs-UTgljrUKsWhCt6oAJUOuzt1Cq3JcG0oPFNreUlJYMQhrYBOdXyFocbiBW8UgZ0FotBhTRfJ2S-b5CqyeNOVethndF7XMVBOsNgvkeuB5tJ6nb7CtyaAc7oaNBLY0eJNZZTGKIX_0teLtuaFFrtbRLYYp1EhamomMA6OQp4zGXzNbPa0_vlJmnVy1YvhlF-YXckzcSTH0ZbbHrzE2nLWeN7ZIw',
      tags: ['实芯理化板', '全钢模块'],
      category: '全钢实验台',
      badge: '主推产品',
      badge_color: 'bg-primary-500',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
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
      badge_color: 'bg-slate-900',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      name: '减震天平台 XL-50',
      sku: '#2024-T03',
      description: '专为万分级天平设计，采用大理石台面及独立避震结构。有效排除外部细微振动干扰。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjZ9bOENXwzfFBFsnRHQJ_SMAjye3yOAkpEXCE8l9dYhf3vCv5S2G70WqsXbSPCbGdrfcBgLUjnRXpsiPuRm3NF0kBCUYnfMDidCtbMmNdDsfs5mpeLbNLRZUSim5n_6XrP_7UevPafZzxNqwQ4x8Xk5ZFCnYTr3ZCcoAftAOdOH7ImyHEaujtklmk7IRVkYhkEvnHyNZiXBjkL-by0GDN03J6TvkpzrQoADitrez8O3SMDzTP9BrwlNq8k1UocFRtPqd2ne_3xxs',
      tags: ['大理石面', '万分级避震'],
      category: '配套设施',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      name: '试剂药品柜 SC-800',
      sku: '#2024-R04',
      description: '分类存储管理系统，配备主动排风接口。全钢柜体经环氧树脂粉末喷涂处理，极度耐腐。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVkx5FziB7uUlHfTaENbQtpbqPtI2YVur0p1SRajwWzYnwDjvNf7QPILvtAIbF8qqoTQeiZ_0RDLajWXXCka_xJj0-TGNS39jq7AuUcM6-qnaYNYiRO_W7ImEC6svrGisB6d4yrMUv6bGToXKrqEs1O4Ndsu37lrops427qD4h0FO0pCnPCIymnIXShfkOFWorEIm7-uj1T26N0vTQoubAnKwIApxMlAE3lrj3TDp37USbUQKYe7ylz--XEatch5D7hcWl_ds4DCU',
      tags: ['耐强酸碱', '排风接口'],
      category: '药品存储柜',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      name: '防爆气瓶柜 GC-100',
      sku: '#2024-G05',
      description: '集成自动气体侦测报警系统与排风系统。符合OSHA及各级实验室安全操作规范。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhsBOZsAtE85IeA7HiaMDbTCjJvIlq0KPio1Ph5_C5GA912D6acblsnkCO0c3RAK7-NpG5P2oO7zAJef0sm-rVJK9irRC9fXHBuVY5uuMiQ-Xxzbjud5ESqRkzWlTixYX6iSOYypCXtDL1grz-ud7rU4v1sded4rDJ3gr4jr3LqXQX_u3wI_Jahw0hirNJXbIxoTmJWeGsNHA8bIFFAronQCTz9HsT0C8lN30p4705_0MCEOQZQsmuqisM7WiOWZDlFmY3Z1OJY8',
      tags: ['气体监控', '防爆标准'],
      category: '药品存储柜',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '6',
      name: '钢木边台 XL-305',
      sku: '#2024-W06',
      description: '高性价比钢木结构，台面可选配环氧树脂板或理化板。适合日常操作与常规检测使用。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5VOjBpaDxiNhlbhP142S8Kfs-viDO7-fUIvfFH4wIiXyb7bc7Y9zG085ShNH-PryP09SQNVHsnqzs_z-tWMmiZghcZYxwlg0AvLIuWsOe7v6_nZwQUoCZvw1Ml2f_Slhm0xlL4IMB7iH7EPJ1aok0hU-3ziNje7wCZyYeY5g45ni1Ea99ForfscRjRjw4DWxsGgt0bPSUWUo-_pZMYHTDxkqcAPDNSkOu-A3hXlrnhWNAd3TYYyT-7C1PLOTi5VKfyrvrO4dnCmM',
      tags: ['经济型', '灵活组合'],
      category: '全钢实验台',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const mockCategories = [
    { id: '1', name: '全钢实验台', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', name: '通风柜系统', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', name: '配套设施', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', name: '药品存储柜', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ];

  // 模拟Supabase客户端方法
  return {
    from: (table) => {
      if (table === 'products') {
        return {
          select: (fields, options) => {
            return {
              eq: (column, value) => {
                return {
                  range: (start, end) => {
                    const filtered = mockProducts.filter(p => p[column] === value);
                    const paginated = filtered.slice(start, end + 1);
                    return Promise.resolve({
                      data: paginated,
                      error: null,
                      count: filtered.length
                    });
                  },
                  single: () => {
                    const product = mockProducts.find(p => p[column] === value);
                    return Promise.resolve({
                      data: product,
                      error: product ? null : new Error('Not found')
                    });
                  }
                };
              },
              range: (start, end) => {
                const paginated = mockProducts.slice(start, end + 1);
                return Promise.resolve({
                  data: paginated,
                  error: null,
                  count: mockProducts.length
                });
              },
              single: () => {
                return Promise.resolve({
                  data: mockProducts[0],
                  error: null
                });
              }
            };
          },
          insert: (data) => {
            return {
              select: () => {
                return {
                  single: () => {
                    const newProduct = {
                      ...data,
                      id: Date.now().toString(),
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString()
                    };
                    mockProducts.push(newProduct);
                    return Promise.resolve({
                      data: newProduct,
                      error: null
                    });
                  }
                };
              }
            };
          },
          update: (data) => {
            return {
              eq: (column, value) => {
                return {
                  select: () => {
                    return {
                      single: () => {
                        const index = mockProducts.findIndex(p => p[column] === value);
                        if (index !== -1) {
                          mockProducts[index] = {
                            ...mockProducts[index],
                            ...data,
                            updated_at: new Date().toISOString()
                          };
                          return Promise.resolve({
                            data: mockProducts[index],
                            error: null
                          });
                        }
                        return Promise.resolve({
                          data: null,
                          error: new Error('Not found')
                        });
                      }
                    };
                  }
                };
              }
            };
          },
          delete: () => {
            return {
              eq: (column, value) => {
                const index = mockProducts.findIndex(p => p[column] === value);
                if (index !== -1) {
                  mockProducts.splice(index, 1);
                }
                return Promise.resolve({ error: null });
              }
            };
          }
        };
      } else if (table === 'categories') {
        return {
          select: (fields) => {
            return Promise.resolve({
              data: mockCategories,
              error: null
            });
          },
          insert: (data) => {
            return {
              select: () => {
                return {
                  single: () => {
                    const newCategory = {
                      ...data,
                      id: Date.now().toString(),
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString()
                    };
                    mockCategories.push(newCategory);
                    return Promise.resolve({
                      data: newCategory,
                      error: null
                    });
                  }
                };
              }
            };
          },
          update: (data) => {
            return {
              eq: (column, value) => {
                return {
                  select: () => {
                    return {
                      single: () => {
                        const index = mockCategories.findIndex(c => c[column] === value);
                        if (index !== -1) {
                          mockCategories[index] = {
                            ...mockCategories[index],
                            ...data,
                            updated_at: new Date().toISOString()
                          };
                          return Promise.resolve({
                            data: mockCategories[index],
                            error: null
                          });
                        }
                        return Promise.resolve({
                          data: null,
                          error: new Error('Not found')
                        });
                      }
                    };
                  }
                };
              }
            };
          },
          delete: () => {
            return {
              eq: (column, value) => {
                const index = mockCategories.findIndex(c => c[column] === value);
                if (index !== -1) {
                  mockCategories.splice(index, 1);
                }
                return Promise.resolve({ error: null });
              }
            };
          }
        };
      } else if (table === 'tags') {
        return {
          select: (fields) => {
            return {
              in: (column, values) => {
                return Promise.resolve({
                  data: [],
                  error: null
                });
              }
            };
          },
          insert: (data) => {
            return {
              select: () => {
                return {
                  single: () => {
                    return Promise.resolve({
                      data: { id: Date.now().toString(), ...data },
                      error: null
                    });
                  }
                };
              }
            };
          }
        };
      } else if (table === 'product_tags') {
        return {
          select: (fields) => {
            return {
              eq: (column, value) => {
                return Promise.resolve({
                  data: [],
                  error: null
                });
              }
            };
          },
          insert: (data) => {
            return Promise.resolve({ error: null });
          },
          delete: () => {
            return {
              eq: (column, value) => {
                return Promise.resolve({ error: null });
              }
            };
          }
        };
      }
      return {};
    }
  };
}

export default supabase;