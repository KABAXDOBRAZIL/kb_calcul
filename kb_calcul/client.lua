local isCalculetteOpen = false


function playCalculetteAnimation()
    local playerPed = PlayerPedId() 

   
    if not IsPedInAnyVehicle(playerPed, false) then

        TaskPlayAnim(playerPed, "cellphone@", "cellphone_text_in", 3.0, 3.0, -1, 50, 0, false, false, false)  
        
        Citizen.Wait(15) 
    end
end


RegisterNetEvent('kb_calcul:openCalcul')
AddEventHandler('kb_calcul:openCalcul', function(contractType, metadata)
    if not isCalculetteOpen then
        isCalculetteOpen = true

        playCalculetteAnimation()
        SetNuiFocus(true, true)
        SendNUIMessage({
            action = 'openCalcul',
        })
    end
end)


RegisterNUICallback('closeCalcul', function(data, cb)
    local playerPed = PlayerPedId() 
    ClearPedTasksImmediately(playerPed)
    isCalculetteOpen = false
    SetNuiFocus(false, false)
    cb('ok')
end)

exports('calculette', function(data, slot)
    if not isCalculetteOpen then
        isCalculetteOpen = true

 
        playCalculetteAnimation()

        SendNUIMessage({
            action = 'openCalcul',
        })
        SetNuiFocus(true, true)
    end
end)
