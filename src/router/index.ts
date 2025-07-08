import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useSystema } from '@/stores/systema';
import axios from 'axios';

async function getVersion() {
  try {
    const response = await axios.get('https://api.auraproducciones.lat/version');
    const version = response.data.version;
    console.log('Version:', version);
    return version;
  } catch (error) {
    console.error('Error fetching version:', error);
    return null;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/sitio',
  },

  {
    path: '/probando2',
    component: () => import('@/views/Probando2.vue'),
  },
  {
    path: '/actualizar',
    component: () => import('@/views/Actualizacion.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/sitio',
    component: () => import('@/layouts/Sitio.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Inicio.vue')
      },
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/Admin.vue'),
    meta: { requiresAuth: true, permission: ['admin'] },
    children: [
      {
        path: '',
        component: () => import('@/views/Inicio.vue')
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  const systema = useSystema();

  const token = auth.token_feathers;
  const permissions = auth.permissions || [];

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiredPermissions = to.matched
    .flatMap(record => record.meta.permission || []);

  // 🔄 Comparar versión actual con la de la API
  const remoteVersion = await getVersion();
  const localVersion = systema.version;

  if (remoteVersion && remoteVersion !== localVersion && to.path !== '/actualizar') {
    return next('/actualizar');
  }

  if (remoteVersion && remoteVersion === localVersion && to.path === '/actualizar') {
    return next('/');
  }

  // 🔐 Si la ruta requiere autenticación
  if (requiresAuth) {
    if (!token) {
      return next('/login');
    }

    // 🛂 Si se requieren permisos específicos
    // if (requiredPermissions.length > 0) {
    //   const hasPermission = requiredPermissions.some(p => permissions.includes(p));
    //   if (!hasPermission) {
    //     return next('/sitio'); // o mostrar una página de "no autorizado"
    //   }
    // }
  }

  return next();
});

export default router;
