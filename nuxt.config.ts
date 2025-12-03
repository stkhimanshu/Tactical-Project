// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  modules: ['@pinia/nuxt'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: 'Tactical Project',
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        }
      ]
    }
  },
  runtimeConfig: {
    CC_LOGIN_ID: 'revboostapirs.clickthruiq',
    CC_PASSWORD: 'dkIpdwryHh3921kDp20azmoV',
    GOOGLE_API_KEY: 'AIzaSyAXA_xtbuQE7O7XGFwTKFvToUiiEpALAAg',
    threedsAPI_KEY: '7ed307a8438289c4f00e001d29028ea7',
    public: {
      checkoutChampApiBase: 'https://api.checkoutchamp.com',
      pixel_id: "",
      access_token: "",
      CC_CAMPAIGN_ID: "2", // clone of 1 campaign id
      SecretKey: "darkAngle",
      svarBrandName: 'Tactical X Abs',
      svarDomainName: 'tacticalxabs.com ',
      email: 'help@tacticalxabs.com',
      phoneNumber: "+1 775-204-1037",
      paypalBillerId: 4,
      vipProduct: 103,
      stiProduct: 81,
      // vipUpsell: 1785,
      shipProfileId: 1,
      freeShipProfileId: 2,
      tacticalXabsIds: [93, 156, 159, 161],
      offer1: 60,
      offer2: 122,
      offer2_1: 109,
      offer3: 72,
      offer4: 123,
      thankyou: 71,
      gtm: {
        id: "GTM-P4MS7R4D",
        queryParams: "",
        defer: true,
        compatibility: false,
        nonce: "2726c7f26c",
        enabled: true,
        debug: true,
        loadScript: true,
        enableRouterSync: true,
        ignoredViews: "",
        trackOnNextTick: true,
        devtools: false,
      },
    }
  }
})