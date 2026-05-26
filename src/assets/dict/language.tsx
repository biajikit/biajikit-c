import {getStorage, setStorage} from "@/core/publicFn";
import {languageKeyList} from '@/assets/dict/pageLanguage.ts'
import {useState, useEffect} from 'react'
import React from 'react';

const languageList: Record<string, Record<string, string>> = {
    "nav.cart": {
        "EN": "Cart",
        "ZH-CN": "购物车",
        "ZH-TW": "購物車",
        "JA": "カート",
        "TH": "ตะกร้า",
        "FR": "Panier",
        "DE": "Warenkorb",
        "ES": "Carrito",
        "IT": "Carrello"
    },
    "nav.language": {
        "EN": "Language",
        "ZH-CN": "语言",
        "ZH-TW": "語言",
        "JA": "言語",
        "TH": "ภาษา",
        "FR": "Langue",
        "DE": "Sprache",
        "ES": "Idioma",
        "IT": "Lingua"
    },
    "nav.secondary.menu": {
        "EN": "Menu",
        "ZH-CN": "点单",
        "ZH-TW": "點餐",
        "JA": "メニュー",
        "TH": "เมนู",
        "FR": "Menu",
        "DE": "Speisekarte",
        "ES": "Menú",
        "IT": "Menu"
    },
    "nav.secondary.visitUs": {
        "EN": "Visit us",
        "ZH-CN": "到店",
        "ZH-TW": "到店",
        "JA": "店舗情報",
        "TH": "ข้อมูลร้าน",
        "FR": "Nous trouver",
        "DE": "Anfahrt",
        "ES": "Visítanos",
        "IT": "Vienici a trovare"
    },
    "store.service.dineIn": {
        "EN": "Dine-in",
        "ZH-CN": "堂食",
        "ZH-TW": "堂食",
        "JA": "店内飲食",
        "TH": "ทานที่ร้าน",
        "FR": "Sur place",
        "DE": "Vor Ort essen",
        "ES": "Comer aquí",
        "IT": "Consumazione sul posto"
    },
    "store.service.takeaway": {
        "EN": "Takeaway",
        "ZH-CN": "自取",
        "ZH-TW": "自取",
        "JA": "テイクアウト",
        "TH": "รับกลับ",
        "FR": "À emporter",
        "DE": "Zum Mitnehmen",
        "ES": "Para llevar",
        "IT": "Da asporto"
    },
    "store.service.delivery": {
        "EN": "Delivery",
        "ZH-CN": "外送",
        "ZH-TW": "外送",
        "JA": "デリバリー",
        "TH": "จัดส่ง",
        "FR": "Livraison",
        "DE": "Lieferung",
        "ES": "Entrega",
        "IT": "Consegna"
    },
    "store.service.driveThru": {
        "EN": "Drive-thru",
        "ZH-CN": "免下车取餐",
        "ZH-TW": "免下車取餐",
        "JA": "ドライブスルー",
        "TH": "ไดรฟ์ทรู",
        "FR": "Drive",
        "DE": "Drive-in",
        "ES": "Autoservicio",
        "IT": "Drive-through"
    },
    "store.parking.free": {
        "EN": "Free parking",
        "ZH-CN": "免费停车",
        "ZH-TW": "免費停車",
        "JA": "無料駐車場",
        "TH": "ที่จอดรถฟรี",
        "FR": "Parking gratuit",
        "DE": "Kostenlose Parkplätze",
        "ES": "Estacionamiento gratis",
        "IT": "Parcheggio gratuito"
    },
    "store.parking.paid": {
        "EN": "Paid parking",
        "ZH-CN": "付费停车",
        "ZH-TW": "付費停車",
        "JA": "有料駐車場",
        "TH": "ที่จอดรถแบบเสียเงิน",
        "FR": "Parking payant",
        "DE": "Kostenpflichtige Parkplätze",
        "ES": "Estacionamiento de pago",
        "IT": "Parcheggio a pagamento"
    },
    "store.payment.cash": {
        "EN": "Cash",
        "ZH-CN": "现金",
        "ZH-TW": "現金",
        "JA": "現金",
        "TH": "เงินสด",
        "FR": "Espèces",
        "DE": "Barzahlung",
        "ES": "Efectivo",
        "IT": "Contanti"
    },
    "store.payment.creditCard": {
        "EN": "Credit card",
        "ZH-CN": "信用卡",
        "ZH-TW": "信用卡",
        "JA": "クレジットカード",
        "TH": "บัตรเครดิต",
        "FR": "Carte de crédit",
        "DE": "Kreditkarte",
        "ES": "Tarjeta de crédito",
        "IT": "Carta di credito"
    },
    "store.payment.debitCard": {
        "EN": "Debit card",
        "ZH-CN": "借记卡",
        "ZH-TW": "簽帳金融卡",
        "JA": "デビットカード",
        "TH": "บัตรเดบิต",
        "FR": "Carte de débit",
        "DE": "Debitkarte",
        "ES": "Tarjeta de débito",
        "IT": "Carta di debito"
    },
    "store.payment.applePay": {
        "EN": "Apple Pay",
        "ZH-CN": "Apple Pay",
        "ZH-TW": "Apple Pay",
        "JA": "Apple Pay",
        "TH": "Apple Pay",
        "FR": "Apple Pay",
        "DE": "Apple Pay",
        "ES": "Apple Pay",
        "IT": "Apple Pay"
    },
    "store.payment.googlePay": {
        "EN": "Google Pay",
        "ZH-CN": "Google Pay",
        "ZH-TW": "Google Pay",
        "JA": "Google Pay",
        "TH": "Google Pay",
        "FR": "Google Pay",
        "DE": "Google Pay",
        "ES": "Google Pay",
        "IT": "Google Pay"
    },
    "store.payment.paypal": {
        "EN": "PayPal",
        "ZH-CN": "PayPal",
        "ZH-TW": "PayPal",
        "JA": "PayPal",
        "TH": "PayPal",
        "FR": "PayPal",
        "DE": "PayPal",
        "ES": "PayPal",
        "IT": "PayPal"
    },
    "store.payment.alipay": {
        "EN": "Alipay",
        "ZH-CN": "支付宝",
        "ZH-TW": "支付寶",
        "JA": "Alipay",
        "TH": "Alipay",
        "FR": "Alipay",
        "DE": "Alipay",
        "ES": "Alipay",
        "IT": "Alipay"
    },
    "store.payment.weChatPay": {
        "EN": "WeChat Pay",
        "ZH-CN": "微信支付",
        "ZH-TW": "微信支付",
        "JA": "WeChat Pay",
        "TH": "WeChat Pay",
        "FR": "WeChat Pay",
        "DE": "WeChat Pay",
        "ES": "WeChat Pay",
        "IT": "WeChat Pay"
    },
    "store.payment.unionPay": {
        "EN": "UnionPay",
        "ZH-CN": "银联",
        "ZH-TW": "銀聯",
        "JA": "UnionPay",
        "TH": "UnionPay",
        "FR": "UnionPay",
        "DE": "UnionPay",
        "ES": "UnionPay",
        "IT": "UnionPay"
    },
    "store.payment.octopus": {
        "EN": "Octopus",
        "ZH-CN": "八达通",
        "ZH-TW": "八達通",
        "JA": "Octopus",
        "TH": "Octopus",
        "FR": "Octopus",
        "DE": "Octopus",
        "ES": "Octopus",
        "IT": "Octopus"
    },
    "store.payment.payMe": {
        "EN": "PayMe by HSBC",
        "ZH-CN": "PayMe by HSBC",
        "ZH-TW": "PayMe by HSBC",
        "JA": "PayMe by HSBC",
        "TH": "PayMe by HSBC",
        "FR": "PayMe by HSBC",
        "DE": "PayMe by HSBC",
        "ES": "PayMe by HSBC",
        "IT": "PayMe by HSBC"
    },
    "store.payment.payPay": {
        "EN": "PayPay",
        "ZH-CN": "PayPay",
        "ZH-TW": "PayPay",
        "JA": "PayPay",
        "TH": "PayPay",
        "FR": "PayPay",
        "DE": "PayPay",
        "ES": "PayPay",
        "IT": "PayPay"
    },
    "store.payment.suica": {
        "EN": "Suica",
        "ZH-CN": "Suica",
        "ZH-TW": "Suica",
        "JA": "Suica",
        "TH": "Suica",
        "FR": "Suica",
        "DE": "Suica",
        "ES": "Suica",
        "IT": "Suica"
    },
    "store.payment.pasmo": {
        "EN": "PASMO",
        "ZH-CN": "PASMO",
        "ZH-TW": "PASMO",
        "JA": "PASMO",
        "TH": "PASMO",
        "FR": "PASMO",
        "DE": "PASMO",
        "ES": "PASMO",
        "IT": "PASMO"
    },
    "store.payment.rakutenPay": {
        "EN": "Rakuten Pay",
        "ZH-CN": "Rakuten Pay",
        "ZH-TW": "Rakuten Pay",
        "JA": "Rakuten Pay",
        "TH": "Rakuten Pay",
        "FR": "Rakuten Pay",
        "DE": "Rakuten Pay",
        "ES": "Rakuten Pay",
        "IT": "Rakuten Pay"
    },
    "store.payment.dBarai": {
        "EN": "d払い",
        "ZH-CN": "d払い",
        "ZH-TW": "d払い",
        "JA": "d払い",
        "TH": "d払い",
        "FR": "d払い",
        "DE": "d払い",
        "ES": "d払い",
        "IT": "d払い"
    },
    "store.payment.jcb": {
        "EN": "JCB",
        "ZH-CN": "JCB",
        "ZH-TW": "JCB",
        "JA": "JCB",
        "TH": "JCB",
        "FR": "JCB",
        "DE": "JCB",
        "ES": "JCB",
        "IT": "JCB"
    },
    "store.payment.payNow": {
        "EN": "PayNow",
        "ZH-CN": "PayNow",
        "ZH-TW": "PayNow",
        "JA": "PayNow",
        "TH": "PayNow",
        "FR": "PayNow",
        "DE": "PayNow",
        "ES": "PayNow",
        "IT": "PayNow"
    },
    "store.payment.payLah": {
        "EN": "PayLah!",
        "ZH-CN": "PayLah!",
        "ZH-TW": "PayLah!",
        "JA": "PayLah!",
        "TH": "PayLah!",
        "FR": "PayLah!",
        "DE": "PayLah!",
        "ES": "PayLah!",
        "IT": "PayLah!"
    },
    "store.payment.grabPay": {
        "EN": "GrabPay",
        "ZH-CN": "GrabPay",
        "ZH-TW": "GrabPay",
        "JA": "GrabPay",
        "TH": "GrabPay",
        "FR": "GrabPay",
        "DE": "GrabPay",
        "ES": "GrabPay",
        "IT": "GrabPay"
    },
    "store.payment.promptPay": {
        "EN": "PromptPay",
        "ZH-CN": "PromptPay",
        "ZH-TW": "PromptPay",
        "JA": "PromptPay",
        "TH": "PromptPay",
        "FR": "PromptPay",
        "DE": "PromptPay",
        "ES": "PromptPay",
        "IT": "PromptPay"
    },
    "store.payment.trueMoneyWallet": {
        "EN": "TrueMoney Wallet",
        "ZH-CN": "TrueMoney Wallet",
        "ZH-TW": "TrueMoney Wallet",
        "JA": "TrueMoney Wallet",
        "TH": "TrueMoney Wallet",
        "FR": "TrueMoney Wallet",
        "DE": "TrueMoney Wallet",
        "ES": "TrueMoney Wallet",
        "IT": "TrueMoney Wallet"
    },
    "store.payment.venmo": {
        "EN": "Venmo",
        "ZH-CN": "Venmo",
        "ZH-TW": "Venmo",
        "JA": "Venmo",
        "TH": "Venmo",
        "FR": "Venmo",
        "DE": "Venmo",
        "ES": "Venmo",
        "IT": "Venmo"
    },
    "store.payment.cashApp": {
        "EN": "Cash App",
        "ZH-CN": "Cash App",
        "ZH-TW": "Cash App",
        "JA": "Cash App",
        "TH": "Cash App",
        "FR": "Cash App",
        "DE": "Cash App",
        "ES": "Cash App",
        "IT": "Cash App"
    },
    "store.payment.bancontact": {
        "EN": "Bancontact",
        "ZH-CN": "Bancontact",
        "ZH-TW": "Bancontact",
        "JA": "Bancontact",
        "TH": "Bancontact",
        "FR": "Bancontact",
        "DE": "Bancontact",
        "ES": "Bancontact",
        "IT": "Bancontact"
    },
    "store.payment.blik": {
        "EN": "BLIK",
        "ZH-CN": "BLIK",
        "ZH-TW": "BLIK",
        "JA": "BLIK",
        "TH": "BLIK",
        "FR": "BLIK",
        "DE": "BLIK",
        "ES": "BLIK",
        "IT": "BLIK"
    },
    "store.payment.mbWay": {
        "EN": "MB Way",
        "ZH-CN": "MB Way",
        "ZH-TW": "MB Way",
        "JA": "MB Way",
        "TH": "MB Way",
        "FR": "MB Way",
        "DE": "MB Way",
        "ES": "MB Way",
        "IT": "MB Way"
    },
    "store.payment.multibanco": {
        "EN": "Multibanco",
        "ZH-CN": "Multibanco",
        "ZH-TW": "Multibanco",
        "JA": "Multibanco",
        "TH": "Multibanco",
        "FR": "Multibanco",
        "DE": "Multibanco",
        "ES": "Multibanco",
        "IT": "Multibanco"
    },
    "store.payment.mobilePay": {
        "EN": "MobilePay",
        "ZH-CN": "MobilePay",
        "ZH-TW": "MobilePay",
        "JA": "MobilePay",
        "TH": "MobilePay",
        "FR": "MobilePay",
        "DE": "MobilePay",
        "ES": "MobilePay",
        "IT": "MobilePay"
    },
    "store.payment.twint": {
        "EN": "TWINT",
        "ZH-CN": "TWINT",
        "ZH-TW": "TWINT",
        "JA": "TWINT",
        "TH": "TWINT",
        "FR": "TWINT",
        "DE": "TWINT",
        "ES": "TWINT",
        "IT": "TWINT"
    },
    "store.payment.vipps": {
        "EN": "Vipps",
        "ZH-CN": "Vipps",
        "ZH-TW": "Vipps",
        "JA": "Vipps",
        "TH": "Vipps",
        "FR": "Vipps",
        "DE": "Vipps",
        "ES": "Vipps",
        "IT": "Vipps"
    },
    "footer.social.facebook": {
        "EN": "Facebook",
        "ZH-CN": "Facebook",
        "ZH-TW": "Facebook",
        "JA": "Facebook",
        "TH": "Facebook",
        "FR": "Facebook",
        "DE": "Facebook",
        "ES": "Facebook",
        "IT": "Facebook"
    },
    "footer.social.instagram": {
        "EN": "Instagram",
        "ZH-CN": "Instagram",
        "ZH-TW": "Instagram",
        "JA": "Instagram",
        "TH": "Instagram",
        "FR": "Instagram",
        "DE": "Instagram",
        "ES": "Instagram",
        "IT": "Instagram"
    },
    "footer.social.youtube": {
        "EN": "YouTube",
        "ZH-CN": "YouTube",
        "ZH-TW": "YouTube",
        "JA": "YouTube",
        "TH": "YouTube",
        "FR": "YouTube",
        "DE": "YouTube",
        "ES": "YouTube",
        "IT": "YouTube"
    },
    "footer.social.tiktok": {
        "EN": "TikTok",
        "ZH-CN": "TikTok",
        "ZH-TW": "TikTok",
        "JA": "TikTok",
        "TH": "TikTok",
        "FR": "TikTok",
        "DE": "TikTok",
        "ES": "TikTok",
        "IT": "TikTok"
    },
    "footer.social.x": {
        "EN": "X",
        "ZH-CN": "X",
        "ZH-TW": "X",
        "JA": "X",
        "TH": "X",
        "FR": "X",
        "DE": "X",
        "ES": "X",
        "IT": "X"
    },
    "footer.social.xiaohongshu": {
        "EN": "Xiaohongshu",
        "ZH-CN": "小红书",
        "ZH-TW": "小紅書",
        "JA": "Xiaohongshu",
        "TH": "Xiaohongshu",
        "FR": "Xiaohongshu",
        "DE": "Xiaohongshu",
        "ES": "Xiaohongshu",
        "IT": "Xiaohongshu"
    },
    "footer.social.douyin": {
        "EN": "Douyin",
        "ZH-CN": "抖音",
        "ZH-TW": "抖音",
        "JA": "Douyin",
        "TH": "Douyin",
        "FR": "Douyin",
        "DE": "Douyin",
        "ES": "Douyin",
        "IT": "Douyin"
    },
    "footer.social.whatsapp": {
        "EN": "WhatsApp",
        "ZH-CN": "WhatsApp",
        "ZH-TW": "WhatsApp",
        "JA": "WhatsApp",
        "TH": "WhatsApp",
        "FR": "WhatsApp",
        "DE": "WhatsApp",
        "ES": "WhatsApp",
        "IT": "WhatsApp"
    },
    "footer.copyright": {
        "EN": "© {year} {storeName}",
        "ZH-CN": "© {year} {storeName}",
        "ZH-TW": "© {year} {storeName}",
        "JA": "© {year} {storeName}",
        "TH": "© {year} {storeName}",
        "FR": "© {year} {storeName}",
        "DE": "© {year} {storeName}",
        "ES": "© {year} {storeName}",
        "IT": "© {year} {storeName}"
    },
    "footer.poweredBy": {
        "EN": "Powered by {BiajiKit}",
        "ZH-CN": "由 {BiajiKit} 提供支持",
        "ZH-TW": "由 {BiajiKit} 提供支援",
        "JA": "{BiajiKit} により提供",
        "TH": "ขับเคลื่อนโดย {BiajiKit}",
        "FR": "Propulsé par {BiajiKit}",
        "DE": "Powered by {BiajiKit}",
        "ES": "Con tecnología de {BiajiKit}",
        "IT": "Realizzato con {BiajiKit}"
    },
    "cart.floating.viewCart": {
        "EN": "View cart",
        "ZH-CN": "查看购物车",
        "ZH-TW": "查看購物車",
        "JA": "カートを見る",
        "TH": "ดูตะกร้า",
        "FR": "Voir le panier",
        "DE": "Warenkorb anzeigen",
        "ES": "Ver carrito",
        "IT": "Vedi carrello"
    },
    "cart.floating.yourOrder": {
        "EN": "Your order",
        "ZH-CN": "你的订单",
        "ZH-TW": "你的訂單",
        "JA": "ご注文",
        "TH": "คำสั่งซื้อของคุณ",
        "FR": "Votre commande",
        "DE": "Ihre Bestellung",
        "ES": "Tu pedido",
        "IT": "Il tuo ordine"
    },
    "cart.tableNumber": {
        "EN": "Table number",
        "ZH-CN": "桌号",
        "ZH-TW": "桌號",
        "JA": "テーブル番号",
        "TH": "หมายเลขโต๊ะ",
        "FR": "Numéro de table",
        "DE": "Tischnummer",
        "ES": "Número de mesa",
        "IT": "Numero del tavolo"
    },
    "cart.note": {
        "EN": "Note",
        "ZH-CN": "备注",
        "ZH-TW": "備註",
        "JA": "備考",
        "TH": "หมายเหตุ",
        "FR": "Remarque",
        "DE": "Hinweis",
        "ES": "Nota",
        "IT": "Nota"
    },
    "cart.specialRequests": {
        "EN": "Any allergies or special requests?",
        "ZH-CN": "有过敏或特殊要求吗？",
        "ZH-TW": "有過敏或特殊要求嗎？",
        "JA": "アレルギーやご要望はありますか？",
        "TH": "มีอาการแพ้หรือคำขอพิเศษไหม？",
        "FR": "Avez-vous des allergies ou des demandes particulières ?",
        "DE": "Haben Sie Allergien oder besondere Wünsche?",
        "ES": "¿Tienes alergias o alguna petición especial?",
        "IT": "Hai allergie o richieste speciali?"
    },
    "cart.subtotal": {
        "EN": "Subtotal",
        "ZH-CN": "小计",
        "ZH-TW": "小計",
        "JA": "小計",
        "TH": "ยอดรวมย่อย",
        "FR": "Sous-total",
        "DE": "Zwischensumme",
        "ES": "Subtotal",
        "IT": "Subtotale"
    },
    "cart.discount": {
        "EN": "Discount",
        "ZH-CN": "优惠",
        "ZH-TW": "優惠",
        "JA": "割引",
        "TH": "ส่วนลด",
        "FR": "Remise",
        "DE": "Rabatt",
        "ES": "Descuento",
        "IT": "Sconto"
    },
    "cart.total": {
        "EN": "Total",
        "ZH-CN": "总计",
        "ZH-TW": "總計",
        "JA": "合計",
        "TH": "ยอดรวม",
        "FR": "Total",
        "DE": "Gesamt",
        "ES": "Total",
        "IT": "Totale"
    },
    "cart.placeOrder": {
        "EN": "Place order",
        "ZH-CN": "下单",
        "ZH-TW": "下單",
        "JA": "注文する",
        "TH": "สั่งซื้อ",
        "FR": "Passer commande",
        "DE": "Bestellung aufgeben",
        "ES": "Realizar pedido",
        "IT": "Invia ordine"
    },
    "cart.empty.title": {
        "EN": "No items yet",
        "ZH-CN": "还没有添加商品",
        "ZH-TW": "還沒有加入商品",
        "JA": "まだ商品がありません",
        "TH": "ยังไม่มีรายการ",
        "FR": "Votre panier est vide",
        "DE": "Noch keine Artikel",
        "ES": "Todavía no hay artículos",
        "IT": "Non hai ancora aggiunto articoli"
    },
    "cart.empty.orderNow": {
        "EN": "Order now",
        "ZH-CN": "去点单",
        "ZH-TW": "去點餐",
        "JA": "注文する",
        "TH": "สั่งเลย",
        "FR": "Commander",
        "DE": "Bestellen",
        "ES": "Pedir ahora",
        "IT": "Ordina ora"
    },
    "order.sending": {
        "EN": "Sending order…",
        "ZH-CN": "正在提交订单…",
        "ZH-TW": "正在送出訂單…",
        "JA": "注文を送信中…",
        "TH": "กำลังส่งคำสั่งซื้อ…",
        "FR": "Envoi de la commande…",
        "DE": "Bestellung wird gesendet…",
        "ES": "Enviando pedido…",
        "IT": "Invio dell’ordine…"
    },
    "order.placed": {
        "EN": "Order placed",
        "ZH-CN": "下单成功",
        "ZH-TW": "下單成功",
        "JA": "注文が完了しました",
        "TH": "สั่งซื้อสำเร็จ",
        "FR": "Commande passée",
        "DE": "Bestellung aufgegeben",
        "ES": "Pedido realizado",
        "IT": "Ordine effettuato"
    },
    "order.number": {
        "EN": "Order #",
        "ZH-CN": "订单号",
        "ZH-TW": "訂單號碼",
        "JA": "注文番号",
        "TH": "หมายเลขคำสั่งซื้อ",
        "FR": "N° de commande",
        "DE": "Bestellnummer",
        "ES": "N.º de pedido",
        "IT": "N. ordine"
    },
    "order.table": {
        "EN": "Table",
        "ZH-CN": "桌号",
        "ZH-TW": "桌號",
        "JA": "テーブル",
        "TH": "โต๊ะ",
        "FR": "Table",
        "DE": "Tisch",
        "ES": "Mesa",
        "IT": "Tavolo"
    },
    "order.total": {
        "EN": "Total",
        "ZH-CN": "总计",
        "ZH-TW": "總計",
        "JA": "合計",
        "TH": "ยอดรวม",
        "FR": "Total",
        "DE": "Gesamt",
        "ES": "Total",
        "IT": "Totale"
    },
    "order.placedAt": {
        "EN": "Placed at",
        "ZH-CN": "下单时间",
        "ZH-TW": "下單時間",
        "JA": "注文日時",
        "TH": "เวลาที่สั่ง",
        "FR": "Passée à",
        "DE": "Aufgegeben um",
        "ES": "Realizado a las",
        "IT": "Effettuato alle"
    },
    "order.sentToRestaurant": {
        "EN": "Your order has been sent to the restaurant.",
        "ZH-CN": "订单已发送至餐厅。",
        "ZH-TW": "訂單已送出至餐廳。",
        "JA": "ご注文は店舗に送信されました。",
        "TH": "ส่งคำสั่งซื้อของคุณไปยังร้านอาหารแล้ว",
        "FR": "Votre commande a été envoyée au restaurant.",
        "DE": "Ihre Bestellung wurde an das Restaurant gesendet.",
        "ES": "Tu pedido se ha enviado al restaurante.",
        "IT": "Il tuo ordine è stato inviato al ristorante."
    },
    "order.viewOrder": {
        "EN": "View order",
        "ZH-CN": "查看订单",
        "ZH-TW": "查看訂單",
        "JA": "注文を見る",
        "TH": "ดูคำสั่งซื้อ",
        "FR": "Voir la commande",
        "DE": "Bestellung anzeigen",
        "ES": "Ver pedido",
        "IT": "Vedi ordine"
    },
    "order.addMore": {
        "EN": "Add more",
        "ZH-CN": "继续加点",
        "ZH-TW": "繼續加點",
        "JA": "さらに追加",
        "TH": "เพิ่มรายการ",
        "FR": "Ajouter plus",
        "DE": "Mehr hinzufügen",
        "ES": "Añadir más",
        "IT": "Aggiungi altro"
    },
    "order.itemCount": {
        "EN": "{count} items",
        "ZH-CN": "{count} 件",
        "ZH-TW": "{count} 件",
        "JA": "{count} 点",
        "TH": "{count} รายการ",
        "FR": "{count} article(s)",
        "DE": "{count} Artikel",
        "ES": "{count} artículo(s)",
        "IT": "{count} articolo/i"
    },
    "order.placedCount": {
        "EN": "{count} order placed",
        "ZH-CN": "已提交 {count} 个订单",
        "ZH-TW": "已提交 {count} 筆訂單",
        "JA": "{count} 件の注文が完了しました",
        "TH": "สั่งซื้อสำเร็จ {count} รายการ",
        "FR": "{count} commande passée",
        "DE": "{count} Bestellung aufgegeben",
        "ES": "{count} pedido realizado",
        "IT": "{count} ordine effettuato"
    },
    "order.tableNumberValue": {
        "EN": "Table {tableNumber}",
        "ZH-CN": "桌号 {tableNumber}",
        "ZH-TW": "桌號 {tableNumber}",
        "JA": "テーブル {tableNumber}",
        "TH": "โต๊ะ {tableNumber}",
        "FR": "Table {tableNumber}",
        "DE": "Tisch {tableNumber}",
        "ES": "Mesa {tableNumber}",
        "IT": "Tavolo {tableNumber}"
    },
    "order.view": {
        "EN": "View",
        "ZH-CN": "查看",
        "ZH-TW": "查看",
        "JA": "表示",
        "TH": "ดู",
        "FR": "Voir",
        "DE": "Anzeigen",
        "ES": "Ver",
        "IT": "Visualizza"
    },
}

// 语言类型
type LangKey = (typeof languageKeyList)[number]['key'];

// 当前语言
let currentLang: LangKey = (getStorage('lang') as LangKey) || 'EN';

// 订阅器
const listeners: (() => void)[] = [];

// 初始化语言
export function initLang(): void {
    const local = getStorage('lang') as LangKey | null;
    if (local) currentLang = local;
}

// 设置语言
export function setLang(lang: LangKey): void {
    currentLang = lang;
    setStorage('lang', lang);
    listeners.forEach(fn => fn());
}

export function useLanguage() {
    const [, setTick] = useState(0);

    useEffect(() => {
        initLang();
        const update = () => setTick(t => t + 1);
        listeners.push(update);

        return () => {
            const idx = listeners.indexOf(update);
            if (idx > -1) listeners.splice(idx, 1);
        };
    }, []);

    const currentLangInfo =
        languageKeyList.find(item => item.key === currentLang)
        ?? languageKeyList[0];

    const t = (
        key: string,
        params?: Record<string, string | React.ReactNode>
    ): React.ReactNode => {
        const entry = languageList[key] ?? {};
        const text = entry[currentLang] ?? ((
            <span className="m-[0_4px] font-[400] text-[20px] text-[red] cursor-pointer">{key}</span>));

        if (!params) return text;

        const parts: React.ReactNode[] = [];
        const regex = /\{(\w+)\}/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(text)) !== null) {
            const [fullMatch, paramKey] = match;
            const start = match.index;

            if (start > lastIndex) {
                parts.push(text.slice(lastIndex, start));
            }

            // 用 React.createElement 代替 JSX
            parts.push(
                React.createElement(React.Fragment, {key: start}, params[paramKey] ?? fullMatch)
            );

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return React.createElement(React.Fragment, null, ...parts);
    };

    return {
        t,
        lang: currentLangInfo.key,
        abbreviation: currentLangInfo.abbreviation,
        langName: currentLangInfo.name,
        info: currentLangInfo,
        setLang,
    };
}