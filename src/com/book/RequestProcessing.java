package com.book;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 

import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
public class RequestProcessing extends HandlerInterceptorAdapter {
	 
   
 
    @Override
    public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception 
    {
       //called before handler mapping and controller process (returns true to pass to controller or it will ends at hear itself)
		HttpSession session = request.getSession();
		if (session.getAttribute("user") == null)
			return false;
		else {
			System.out.println("Request");
			return true;
		}
    }
 
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,ModelAndView modelAndView) throws Exception 
  {
        //called after handler mapping and controller processing
    }
 
    @Override
    public void afterCompletion(HttpServletRequest request,HttpServletResponse response, Object handler, Exception ex)
         throws Exception {

         //called after view resolver
    }
 
}
