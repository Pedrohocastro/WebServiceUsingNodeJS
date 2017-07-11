//
//  Server.swift
//  DesafioWebService
//
//  Created by Pedro Oliveira on 11/07/17.
//  Copyright © 2017 BEPiD. All rights reserved.
//

import Foundation
import Alamofire


protocol ServerDelegate : class {
    func server(didFinishGetRequest jsonResult: [NSDictionary])
    func server(deleted jsonResult: NSDictionary)
    func server(didFinishPostRequest jsonResult: NSDictionary)
    func server(updated jsonResult: NSDictionary)
}

class Server : NSObject{
    
    //Criando instancia unica
    static let sharedInstance : Server = {
        let instance = Server()
        return instance
    }()
    
    //criando delegate
    weak var delegate : ServerDelegate?
    
    func delete (url: URL){
        Alamofire.request(url, method: .delete).responseJSON { (response) in
            if !self.isSuccessResponse(response: response) {
                return
            }
            guard let json = response.result.value as? NSDictionary else {
                print("JSON error - get")
                return
            }
            self.delegate?.server(deleted: json)
        }
    }
    
    func post(url: URL, params: [String:Any]){
        Alamofire.request(url, method: .post, parameters: params, encoding: URLEncoding.httpBody, headers: nil).responseJSON { (response) in
            if !self.isSuccessResponse(response: response) {
                return
            }
            guard let json = response.result.value as? NSDictionary else {
                print("JSON error - post")
                return
            }
            self.delegate?.server(didFinishPostRequest: json)
        }
    }
    
    func put(url: URL, params: [String:Any]){
        Alamofire.request(url, method: .put, parameters: params, encoding: URLEncoding.httpBody, headers: nil).responseJSON { (response) in
            if !self.isSuccessResponse(response: response) {
                return
            }
            guard let json = response.result.value as? NSDictionary else {
                print("JSON error - put")
                return
            }
            self.delegate?.server(didFinishPostRequest: json)
        }
    }
    
    // MARK: - Initialization Method
    override private init() {
        super.init()
    }
    
    func isSuccessResponse (response: DataResponse<Any>) -> Bool{
        guard response.result.isSuccess else {
            print("Error response")
            return false
            
        }
        return true
    }

enum TypeRequest  {
    case POST
    case PUT
    case DELETE
    case UPDATE
}

    
}
