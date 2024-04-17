//
//  ContentView.swift
//  Laser Magique
//
//  Created by Thimoté Fétu on 16/04/2024.
//

import SwiftUI
import WebKit

struct WebViewContainer: UIViewRepresentable {
    let urlString: String

    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        if let url = URL(string: urlString) {
            let request = URLRequest(url: url)
            webView.load(request)
        }
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}
}

struct ContentView: View {
    var body: some View {
        NavigationView {
            WebViewContainer(urlString: "http://laser-magique.thimotefetu.fr")
                .edgesIgnoringSafeArea(.bottom)
        }
    }
}

#Preview {
    ContentView()
}
