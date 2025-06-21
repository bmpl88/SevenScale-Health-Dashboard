# 🛠️ STACK TECNOLÓGICO - SevenScale Health Dashboard

**VERSÃO:** v1.1  
**DATA:** 21 Junho 2025  
**CRIADO:** Bruno Monteiro (SevenScale)

---

## 🎯 **ARQUITETURA COMPLETA**

### **⚛️ FRONTEND**
```json
{
  "framework": "React 18",
  "language": "TypeScript",
  "ui_library": "Ant Design (antd)",
  "icons": "Lucide React",
  "styling": "Ant Design classes + CSS inline",
  "state": "React Hooks (useState, useEffect)"
}
```

### **🗄️ BACKEND**
```json
{
  "database": "Supabase PostgreSQL",
  "api": "Supabase realtime + REST",
  "server": "Python FastAPI (planejado)",
  "auth": "Supabase Auth (futuro)",
  "storage": "Supabase Storage (futuro)"
}
```

### **🔗 INTEGRAÇÕES (Planejadas)**
```json
{
  "calendar": "Google Calendar API + Calendly",
  "crm": "HubSpot API",
  "ads": "Google Ads + Meta Ads APIs", 
  "whatsapp": "N8N Workflows + WhatsApp Bot",
  "analytics": "Próprio + Google Analytics"
}
```

---

## 🎨 **SISTEMA DE STYLING**

### **📐 Ant Design Classes (USAR SEMPRE):**
```tsx
// ✅ CORRETO - Ant Design
<div className="grid grid-cols-4 gap-6 p-6">
  <div className="bg-white rounded-lg p-6 shadow-sm">
    // Card content
  </div>
</div>

// ❌ INCORRETO - CSS puro (não funciona com Ant Design)
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
```

### **🎨 Classes Ant Design Essenciais:**
```css
/* Spacing */
p-0, p-1, p-2, p-3, p-4, p-5, p-6, p-7, p-8
m-0, m-1, m-2, m-3, m-4, m-5, m-6, m-7, m-8
gap-1, gap-2, gap-3, gap-4, gap-5, gap-6, gap-8

/* Grid & Flex */
grid, grid-cols-1, grid-cols-2, grid-cols-3, grid-cols-4
flex, flex-col, flex-row, items-center, justify-between

/* Colors */
bg-white, bg-gray-50, bg-blue-50, bg-green-50
text-gray-900, text-gray-600, text-blue-600

/* Borders & Shadows */
rounded-lg, rounded-xl, border, shadow-sm, shadow-md
```

### **🎯 Design System SevenScale:**
```tsx
// Cores principais
const colors = {
  primary: '#FF7A00',      // SevenScale Orange
  dark: '#1A202C',         // Dark Gray
  medium: '#2D3748',       // Medium Gray  
  light: '#F7FAFC',        // Light Background
  success: '#38A169',      // Success Green
  error: '#E53E3E',        // Error Red
  warning: '#ED8936',      // Warning Orange
  info: '#3182CE'          // Info Blue
};

// Gradientes
background: linear-gradient(135deg, #1A202C 0%, #2D3748 100%)
background: linear-gradient(135deg, #FF7A00 0%, #FF8C42 100%)
```

---

## 📦 **DEPENDÊNCIAS EXATAS**

### **package.json (Frontend):**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^4.7.4",
    "antd": "^5.12.8",
    "lucide-react": "^0.263.1",
    "@supabase/supabase-js": "^2.39.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "vite": "^4.1.0"
  }
}
```

### **Supabase Config:**
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseKey!)
```

---

## 🏗️ **ESTRUTURA DE COMPONENTES**

### **📁 Estrutura de Arquivos:**
```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Clientes.tsx  
│   │   ├── Pipeline.tsx
│   │   └── StrategicInsight.tsx
│   ├── hooks/
│   │   ├── useSupabase.ts
│   │   └── useClinicas.ts
│   ├── types/
│   │   ├── clinica.ts
│   │   └── pipeline.ts
│   ├── lib/
│   │   └── supabase.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

### **🎭 Padrão de Componente:**
```tsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Typography } from 'antd';
import { Building2, TrendingUp } from 'lucide-react';

const { Title, Text } = Typography;

interface Props {
  // Props tipadas
}

const ComponenteSevenScale: React.FC<Props> = ({ }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <Space direction="vertical" className="w-full">
            <div className="flex items-center justify-between">
              <Building2 className="w-8 h-8 text-blue-600" />
              <Text className="text-green-600 font-semibold">+12%</Text>
            </div>
            <Title level={2} className="!mb-0">
              {data}
            </Title>
            <Text type="secondary">Label</Text>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ComponenteSevenScale;
```

---

## ⚡ **HOOKS PERSONALIZADOS**

### **🔗 useSupabase Hook:**
```typescript
// hooks/useSupabase.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useClinicas = () => {
  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClinicas();
  }, []);

  const fetchClinicas = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clinicas')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setClinicas(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { clinicas, loading, error, refresh: fetchClinicas };
};
```

---

## 📱 **RESPONSIVIDADE ANT DESIGN**

### **📐 Breakpoints:**
```tsx
// Ant Design breakpoints
xs: '0px',      // Extra small devices
sm: '576px',    // Small devices  
md: '768px',    // Medium devices
lg: '992px',    // Large devices
xl: '1200px',   // Extra large devices
xxl: '1600px'   // Extra extra large devices

// Uso em grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### **🎯 Cards Responsivos:**
```tsx
// ✅ PADRÃO SEVENSCALE
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <Card 
    hoverable
    className="transition-all duration-200 hover:shadow-lg"
    bodyStyle={{ padding: '24px' }}
  >
    <Space direction="vertical" size="middle" className="w-full">
      // Card content
    </Space>
  </Card>
</div>
```

---

## 🚨 **ERROS COMUNS E SOLUÇÕES**

### **❌ Problema: Espaçamento não aparece**
```tsx
// ERRO - CSS inline conflita com Ant Design
<div style={{ gap: '24px', padding: '28px' }}>

// ✅ SOLUÇÃO - Classes Ant Design
<div className="gap-6 p-7">
```

### **❌ Problema: Ícones não carregam**
```tsx
// ERRO - Import incorreto
import { Building2 } from 'lucide-react/icons';

// ✅ SOLUÇÃO - Import correto  
import { Building2 } from 'lucide-react';
```

### **❌ Problema: Supabase não conecta**
```tsx
// ERRO - Variáveis de ambiente
const supabaseUrl = 'your-url';

// ✅ SOLUÇÃO - .env.local
REACT_APP_SUPABASE_URL=https://xxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJxxx
```

---

## 🎯 **INSTRUÇÕES PARA FUTURAS CONVERSAS**

### **📋 Prompt Obrigatório:**
```
STACK TECNOLÓGICO SEVENSCALE:
- Frontend: React TypeScript + Ant Design + Lucide Icons
- Backend: Supabase + Python  
- Styling: SEMPRE usar classes Ant Design, NUNCA CSS inline
- Layout: App-v1.1-FASE2-FIXED.tsx (commit: e845ef8c)

REGRAS:
1. Usar className="gap-6 p-6" ao invés de style={{}}
2. Importar corretamente: import { Card } from 'antd'
3. Manter design system SevenScale (#FF7A00, #1A202C)
4. Preservar funcionalidades existentes

OBJETIVO: [descrever problema específico]
```

### **🔧 Para Correções de Layout:**
1. **Verificar** se está usando Ant Design classes
2. **Confirmar** imports corretos
3. **Aplicar** classes responsivas (md:, lg:)
4. **Testar** em diferentes telas

### **📊 Para Novas Funcionalidades:**
1. **Seguir** padrão de componente SevenScale
2. **Usar** hooks personalizados
3. **Implementar** tipos TypeScript
4. **Documentar** no commit

---

**🏆 RESULTADO:** Stack tecnológico completamente documentado para preservar contexto entre conversas e evitar erros de implementação!

**📅 CRIADO:** 21/06/2025 19:00 BRT  
**🔗 COMMIT:** [próximo commit]  
**👨‍💻 RESPONSÁVEL:** Bruno Monteiro (SevenScale)