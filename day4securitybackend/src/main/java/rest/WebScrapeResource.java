/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import webscraper.TagCounter;
import webscraper.TagDTO;
import webscraper.Tester;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("scrape")
public class WebScrapeResource {

    @Context
    private UriInfo context;
    
    @RolesAllowed("admin")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getTags() throws InterruptedException {
        return makeResponse();
    }

    private String makeResponse() throws InterruptedException {
        //return "{\"todo\":\"Make me return the calculated values from the external requests\"}"; 
        List<TagCounter> dataFeched = Tester.runParrallel();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        List<TagDTO> results = new ArrayList();
        for(TagCounter tc: dataFeched){
            results.add(new TagDTO(tc));
        }
        return gson.toJson(results);
    }
}
